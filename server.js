require('dotenv').config();
const express    = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path       = require('path');

const app       = express();
const PORT      = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

let db;

app.use(express.json({ limit: '20mb' })); // allow base64 product images
app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

// ── Quotations ─────────────────────────────────────────────────

app.post('/api/quotations', async (req, res) => {
  try {
    const result = await db.collection('quotations').insertOne({
      ...req.body,
      createdAt: new Date()
    });
    res.json({ id: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// List — strips images so the list loads fast
app.get('/api/quotations', async (req, res) => {
  try {
    const quotes = await db.collection('quotations')
      .find({}, { projection: { 'quotationItems.imgDataUrl': 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(quotes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Single — includes images for loading/editing
app.get('/api/quotations/:id', async (req, res) => {
  try {
    const quote = await db.collection('quotations').findOne({ _id: new ObjectId(req.params.id) });
    if (!quote) return res.status(404).json({ error: 'Not found' });
    res.json(quote);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/quotations/:id', async (req, res) => {
  try {
    const { _id, createdAt, ...data } = req.body;
    await db.collection('quotations').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/quotations/:id', async (req, res) => {
  try {
    await db.collection('quotations').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Start ──────────────────────────────────────────────────────

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db('handpikd');
    console.log('✓ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`✓ Server running  →  http://localhost:${PORT}`);
      console.log(`  Price Calculator →  http://localhost:${PORT}/pricecal/`);
    });
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });
