require('dotenv').config();
const express    = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path       = require('path');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const session    = require('express-session');
const MongoStore = require('connect-mongo');

const app        = express();
const PORT       = process.env.PORT || 3000;
const MONGO_URI  = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'handpikd-jwt-secret-change-in-production';

if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

let db;

app.use(express.json({ limit: '20mb' }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'handpikd-change-this-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI, dbName: 'handpikd', collectionName: 'sessions' }),
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' }
}));
app.use(express.static(path.join(__dirname)));

// ── Auth middleware ─────────────────────────────────────────────

function resolveCaller(req) {
  // 1. Bearer JWT token (used by the frontend across origins)
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const payload = jwt.verify(auth.slice(7), JWT_SECRET);
      return { userId: payload.userId, isAdmin: payload.isAdmin || false };
    } catch (_) {}
  }
  // 2. Session cookie (same-origin / server-rendered)
  if (req.session?.userId) {
    return { userId: req.session.userId, isAdmin: req.session.isAdmin || false };
  }
  return null;
}

function requireAuth(req, res, next) {
  const caller = resolveCaller(req);
  if (!caller) return res.status(401).json({ error: 'Unauthorized' });
  req.userId  = caller.userId;
  req.isAdmin = caller.isAdmin;
  next();
}
function requireAdmin(req, res, next) {
  const caller = resolveCaller(req);
  if (!caller || !caller.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  req.userId  = caller.userId;
  req.isAdmin = caller.isAdmin;
  next();
}

function getFinancialYearRange(date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const fyStart = month >= 4 ? year : year - 1;
  return {
    start: new Date(fyStart, 3, 1),
    end: new Date(fyStart + 1, 2, 31, 23, 59, 59, 999),
    label: `${fyStart}-${String(fyStart + 1).slice(2)}`
  };
}

// ── Auth routes ─────────────────────────────────────────────────

app.get('/api/auth/needs-setup', async (req, res) => {
  try {
    const count = await db.collection('users').countDocuments();
    res.json({ needsSetup: count === 0 });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Only allowed when zero users exist
app.post('/api/auth/setup', async (req, res) => {
  try {
    const count = await db.collection('users').countDocuments();
    if (count > 0) return res.status(403).json({ error: 'Setup already complete' });
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });
    const passwordHash = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({
      name, email: email.toLowerCase().trim(), phone: '', company: '',
      passwordHash, isAdmin: true, points: 0, createdAt: new Date()
    });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = await db.collection('users').findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
    req.session.userId  = user._id.toString();
    req.session.isAdmin = user.isAdmin || false;
    const token = jwt.sign(
      { userId: user._id.toString(), isAdmin: user.isAdmin || false },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ isAdmin: user.isAdmin || false, name: user.name, token });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(req.userId) },
      { projection: { passwordHash: 0 } }
    );
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ ...user, isAdmin: req.isAdmin });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Admin: Users ────────────────────────────────────────────────

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const users = await db.collection('users')
      .find({}, { projection: { passwordHash: 0 } })
      .sort({ createdAt: -1 }).toArray();
    const counts = await db.collection('orders').aggregate([
      { $group: { _id: '$userId', count: { $sum: 1 } } }
    ]).toArray();
    const countMap = Object.fromEntries(counts.map(c => [c._id.toString(), c.count]));
    users.forEach(u => { u.orderCount = countMap[u._id.toString()] || 0; });
    res.json(users);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const { name, email, phone, company, password, points, isAdmin } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });
    const exists = await db.collection('users').findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({
      name, email: email.toLowerCase().trim(), phone: phone || '',
      company: company || '', passwordHash,
      points: parseInt(points) || 0, isAdmin: !!isAdmin, createdAt: new Date()
    });
    res.json({ id: result.insertedId });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/admin/users/:id', requireAdmin, async (req, res) => {
  try {
    const { name, email, phone, company, password, points, isAdmin } = req.body;
    const update = {
      name, email: email.toLowerCase().trim(), phone: phone || '',
      company: company || '', points: parseInt(points) || 0,
      isAdmin: !!isAdmin, updatedAt: new Date()
    };
    if (password) update.passwordHash = await bcrypt.hash(password, 10);
    await db.collection('users').updateOne({ _id: new ObjectId(req.params.id) }, { $set: update });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    await db.collection('orders').deleteMany({ userId: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Admin: Orders ───────────────────────────────────────────────

app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  try {
    const filter = req.query.userId ? { userId: new ObjectId(req.query.userId) } : {};
    const orders = await db.collection('orders')
      .find(filter, { projection: { invoicePdf: 0 } })
      .sort({ createdAt: -1 }).toArray();
    res.json(orders);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/orders', requireAdmin, async (req, res) => {
  try {
    const { userId, orderNumber, description, amount, status, notes, invoicePdf, invoiceName, orderDate } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const effectiveDate = orderDate ? new Date(orderDate) : new Date();
    if (orderNumber) {
      const { start, end, label } = getFinancialYearRange(effectiveDate);
      const dup = await db.collection('orders').findOne({
        orderNumber,
        $or: [
          { orderDate: { $gte: start, $lte: end } },
          { orderDate: { $exists: false }, createdAt: { $gte: start, $lte: end } }
        ]
      });
      if (dup) return res.status(409).json({ error: `Order number "${orderNumber}" already exists in FY ${label}.` });
    }
    const result = await db.collection('orders').insertOne({
      userId: new ObjectId(userId),
      orderNumber: orderNumber || '', description: description || '',
      amount: parseFloat(amount) || 0, status: status || 'pending',
      notes: notes || '', invoicePdf: invoicePdf || null,
      invoiceName: invoiceName || null, orderDate: effectiveDate, createdAt: new Date()
    });
    res.json({ id: result.insertedId });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/admin/orders/all', requireAdmin, async (req, res) => {
  try {
    const orders = await db.collection('orders')
      .find({}, { projection: { invoicePdf: 0 } })
      .sort({ orderNumber: 1 }).toArray();
    const validIds = [...new Set(orders.filter(o => o.userId).map(o => o.userId.toString()))];
    const users = validIds.length ? await db.collection('users')
      .find({ _id: { $in: validIds.map(id => new ObjectId(id)) } }, { projection: { name: 1, company: 1, email: 1 } })
      .toArray() : [];
    const userMap = Object.fromEntries(users.map(u => [u._id.toString(), u]));
    orders.forEach(o => { o.user = o.userId ? (userMap[o.userId.toString()] || null) : null; });
    res.json(orders);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  try {
    const order = await db.collection('orders').findOne({ _id: new ObjectId(req.params.id) });
    if (!order) return res.status(404).json({ error: 'Not found' });
    res.json(order);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  try {
    const { orderNumber, description, amount, status, notes, invoicePdf, invoiceName, orderDate } = req.body;
    if (orderNumber) {
      const existing = await db.collection('orders').findOne(
        { _id: new ObjectId(req.params.id) }, { projection: { orderDate: 1, createdAt: 1 } }
      );
      const refDate = orderDate ? new Date(orderDate) : (existing?.orderDate || existing?.createdAt || new Date());
      const { start, end, label } = getFinancialYearRange(refDate);
      const dup = await db.collection('orders').findOne({
        orderNumber,
        _id: { $ne: new ObjectId(req.params.id) },
        $or: [
          { orderDate: { $gte: start, $lte: end } },
          { orderDate: { $exists: false }, createdAt: { $gte: start, $lte: end } }
        ]
      });
      if (dup) return res.status(409).json({ error: `Order number "${orderNumber}" already exists in FY ${label}.` });
    }
    const update = {
      orderNumber: orderNumber || '', description: description || '',
      amount: parseFloat(amount) || 0, status: status || 'pending',
      notes: notes || '', updatedAt: new Date()
    };
    if (orderDate) update.orderDate = new Date(orderDate);
    if (invoicePdf !== undefined) { update.invoicePdf = invoicePdf; update.invoiceName = invoiceName; }
    await db.collection('orders').updateOne({ _id: new ObjectId(req.params.id) }, { $set: update });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('orders').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── User: Orders ────────────────────────────────────────────────

app.get('/api/orders', requireAuth, async (req, res) => {
  try {
    const orders = await db.collection('orders')
      .find({ userId: new ObjectId(req.session.userId) }, { projection: { invoicePdf: 0 } })
      .sort({ createdAt: -1 }).toArray();
    res.json(orders);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Returns the PDF for download — user can only fetch their own
app.get('/api/orders/:id/invoice', requireAuth, async (req, res) => {
  try {
    const order = await db.collection('orders').findOne({ _id: new ObjectId(req.params.id) });
    if (!order) return res.status(404).json({ error: 'Not found' });
    if (!req.session.isAdmin && order.userId.toString() !== req.session.userId)
      return res.status(403).json({ error: 'Forbidden' });
    if (!order.invoicePdf) return res.status(404).json({ error: 'No invoice attached' });
    res.json({ invoicePdf: order.invoicePdf, invoiceName: order.invoiceName });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Admin: Analytics & Bulk Download ────────────────────────────

app.get('/api/orders/admin/overview', requireAdmin, async (req, res) => {
  try {
    const [totalUsers, statusAgg, topCustomersAgg, monthlyAgg, recentOrdersRaw] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('orders').aggregate([
        { $group: { _id: '$status', count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
      ]).toArray(),
      db.collection('orders').aggregate([
        { $group: { _id: '$userId', totalSpent: { $sum: '$amount' }, orderCount: { $sum: 1 } } },
        { $sort: { totalSpent: -1 } }, { $limit: 5 },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'u' } },
        { $unwind: { path: '$u', preserveNullAndEmptyArrays: true } },
        { $project: { name: '$u.name', company: '$u.company', totalSpent: 1, orderCount: 1 } }
      ]).toArray(),
      db.collection('orders').aggregate([
        { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, revenue: { $sum: '$amount' } } },
        { $sort: { '_id.year': -1, '_id.month': -1 } }, { $limit: 6 }
      ]).toArray(),
      db.collection('orders').find({}, { projection: { invoicePdf: 0 } }).sort({ createdAt: -1 }).limit(10).toArray()
    ]);
    const statusMap = { pending: 0, processing: 0, delivered: 0, cancelled: 0 };
    let totalRevenue = 0;
    statusAgg.forEach(s => { if (s._id) { statusMap[s._id] = s.count; totalRevenue += s.revenue; } });
    const userIds = [...new Set(recentOrdersRaw.map(o => o.userId.toString()))];
    const uList = userIds.length ? await db.collection('users').find(
      { _id: { $in: userIds.map(id => new ObjectId(id)) } }, { projection: { name: 1, company: 1 } }
    ).toArray() : [];
    const uMap = Object.fromEntries(uList.map(u => [u._id.toString(), u]));
    const recentOrders = recentOrdersRaw.map(o => ({ ...o, userId: uMap[o.userId.toString()] || null }));
    res.json({
      totalUsers, totalOrders: Object.values(statusMap).reduce((a, b) => a + b, 0), totalRevenue,
      statusBreakdown: statusMap, topCustomers: topCustomersAgg,
      monthlyRevenue: monthlyAgg.reverse(), recentOrders
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/orders/admin/invoices', requireAdmin, async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = { invoicePdf: { $ne: null } };
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) { const d = new Date(to); d.setHours(23, 59, 59, 999); filter.createdAt.$lte = d; }
    }
    const orders = await db.collection('orders')
      .find(filter, { projection: { orderNumber: 1, invoicePdf: 1, invoiceName: 1 } })
      .sort({ createdAt: -1 }).toArray();
    res.json(orders);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Quotations ──────────────────────────────────────────────────

app.post('/api/quotations', async (req, res) => {
  try {
    const result = await db.collection('quotations').insertOne({ ...req.body, createdAt: new Date() });
    res.json({ id: result.insertedId });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/quotations', async (req, res) => {
  try {
    const quotes = await db.collection('quotations')
      .find({}, { projection: { 'quotationItems.imgDataUrl': 0 } })
      .sort({ createdAt: -1 }).toArray();
    res.json(quotes);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/quotations/:id', async (req, res) => {
  try {
    const quote = await db.collection('quotations').findOne({ _id: new ObjectId(req.params.id) });
    if (!quote) return res.status(404).json({ error: 'Not found' });
    res.json(quote);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/quotations/:id', async (req, res) => {
  try {
    const { _id, createdAt, ...data } = req.body;
    await db.collection('quotations').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/quotations/:id', async (req, res) => {
  try {
    await db.collection('quotations').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Start ───────────────────────────────────────────────────────

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db('handpikd');
    console.log('✓ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`✓ Server running  →  http://localhost:${PORT}`);
      console.log(`  Price Calculator →  http://localhost:${PORT}/pricecal/`);
      console.log(`  Customer Portal  →  http://localhost:${PORT}/portal/`);
      console.log(`  Admin Panel      →  http://localhost:${PORT}/portal/admin.html`);
    });
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });
