# HANDPIKD Website Fix List — Developer Task Reference

Use this as a checklist in your IDE. Each item has the exact file, what's broken, and what to change.

---

## PRIORITY 1 — CRITICAL (Fix immediately, these are actively hurting you)

### 1.1 Fix canonical URLs across ALL pages

**Problem:** Every page's canonical points to `https://www.handpikd.com` but the live domain is `handpikd.co`. Google may not be indexing your site at all.

**Files to fix:**
- `index.html` — change `<link rel="canonical" href="https://www.handpikd.com">` → `<link rel="canonical" href="https://handpikd.co">`
- `catalogue/index.html` (or however catalogue page is structured) — change `<link rel="canonical" href="https://www.handpikd.com/catalogue">` → `<link rel="canonical" href="https://handpikd.co/catalogue">`
- `blogs/blogs-list.html` — change `<link rel="canonical" href="https://www.handpikd.com/blogs">` → `<link rel="canonical" href="https://handpikd.co/blogs/blogs-list">`
- **Every individual blog post** (all 21 of them) — update canonical to `https://handpikd.co/blogs/{slug}`

Also fix inside the LocalBusiness schema on `index.html`:
```json
"@id": "https://www.handpikd.com"  →  "@id": "https://handpikd.co"
"url": "https://www.handpikd.com"  →  "url": "https://handpikd.co"
"image": "https://www.handpikd.com/images/logo.png"  →  "image": "https://handpikd.co/images/logo.png"
```

### 1.2 Fix meta description to match on-page stats

**Problem:** Meta says "500+ happy clients with 98% satisfaction" but on-page stats show "50 Happy Clients" and "100% Satisfaction Rate". This mismatch destroys trust.

**File:** `index.html`

**Option A — if 50 is the real number:**
```html
<!-- Change this: -->
<meta name="description" content="Leading corporate gifting company in Bangalore. Premium corporate gifts, custom gift hampers, and branded merchandise for businesses. Serving Bangalore & across India. 500+ happy clients with 98% satisfaction.">

<!-- To this: -->
<meta name="description" content="Leading corporate gifting company in Bangalore. Premium corporate gifts, custom gift hampers, and branded merchandise for businesses. Serving Bangalore & across India with 100% client satisfaction.">
```

**Option B — if you have more clients now, update the on-page stats to the real number.**

### 1.3 Replace Gmail with domain email

**Problem:** `handpikdgifting@gmail.com` signals "not a real business" to corporate buyers.

**Action:** Set up Google Workspace for `handpikd.co` (₹136/month). Create `hello@handpikd.co` or `gifting@handpikd.co`.

**File:** `index.html` — update the contact section:
```html
<!-- Change: -->
<p>handpikdgifting@gmail.com</p>

<!-- To: -->
<p>hello@handpikd.co</p>
```

### 1.4 Fix broken footer blog link

**Problem:** Homepage footer links to `blogs/blogs_list` (underscore) but the real page is `blogs/blogs-list` (hyphen). This is a 404.

**File:** `index.html` — in the footer section:
```html
<!-- Change: -->
<li><a href="blogs/blogs_list">Blogs</a></li>

<!-- To: -->
<li><a href="blogs/blogs-list">Blogs</a></li>
```

---

## PRIORITY 2 — HIGH (Fix within 2 weeks, these are losing you leads)

### 2.1 Fix dead social media links

**Problem:** LinkedIn, Instagram, Facebook in footer all point to `#`. Either link real profiles or remove them.

**Files:** `index.html`, `catalogue/index.html`, all blog pages — update footer:
```html
<!-- Change all "#" links to real URLs: -->
<a href="https://www.instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer">Instagram</a>
<a href="https://www.linkedin.com/company/YOUR_PAGE" target="_blank" rel="noopener noreferrer">LinkedIn</a>
<a href="https://wa.me/917411690399" target="_blank" rel="noopener noreferrer">WhatsApp</a>
```

If you don't have a LinkedIn company page yet — create one this week. It's the #1 channel for B2B gifting leads.

### 2.2 Add Open Graph tags to all pages

**Problem:** When someone shares your link on LinkedIn or WhatsApp, there's no preview image or proper title. You're sharing links to prospects — this matters.

**Add to `<head>` of every page:**
```html
<!-- Homepage example -->
<meta property="og:title" content="HANDPIKD — Premium Corporate Gifting in Bangalore">
<meta property="og:description" content="Curated luxury gifts and branded merchandise for businesses across India. Custom hampers, trophies, and corporate event gifting.">
<meta property="og:image" content="https://handpikd.co/images/og-preview.png">
<meta property="og:url" content="https://handpikd.co">
<meta property="og:type" content="website">
<meta property="og:site_name" content="HANDPIKD">

<!-- For each blog post, customize og:title, og:description, og:url -->
```

**Action required:** Create an `og-preview.png` image (1200x630px) — your logo on a clean background with "Premium Corporate Gifting | Bangalore" tagline.

### 2.3 Replace stock photo with real product image

**Problem:** The About section uses `https://images.unsplash.com/photo-1513885535751-8b9238bd345a` — a generic Unsplash stock photo. B2B buyers spot this instantly.

**File:** `index.html`
```html
<!-- Change: -->
<img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80" alt="Premium luxury corporate gift box with custom wrapping and branded merchandise">

<!-- To: a real photo of your products -->
<img src="images/handpikd-gift-box.jpg" alt="HANDPIKD custom corporate gift box with branded merchandise">
```

**Action:** Photograph 3-5 of your best gift sets on a clean background. Use these across the site.

### 2.4 Add product CTAs inside blog posts

**Problem:** All 21 blogs are informational dead-ends. No product images, no links to catalogue, no enquiry CTAs within the content. Readers finish and leave.

**What to add in every blog post (insert after every 2-3 sections):**
```html
<!-- Inline CTA block — add to each blog post -->
<div class="blog-cta-inline" style="background: #f8f6f3; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center;">
    <p style="font-weight: 600; margin-bottom: 8px;">Looking for [TOPIC] gifts?</p>
    <p style="color: #666; margin-bottom: 16px;">We curate custom corporate gift sets starting at ₹300/piece. MOQ: 25 units.</p>
    <a href="/catalogue" style="display: inline-block; padding: 10px 24px; background: #2c2c2c; color: white; border-radius: 8px; text-decoration: none; margin-right: 8px;">View Catalogue</a>
    <a href="https://wa.me/917411690399?text=Hi%2C%20I%20read%20your%20blog%20and%20want%20to%20discuss%20corporate%20gifting" style="display: inline-block; padding: 10px 24px; border: 1px solid #2c2c2c; border-radius: 8px; text-decoration: none; color: #2c2c2c;">WhatsApp Us</a>
</div>
```

**Priority blog posts to update first (highest commercial intent):**
1. `diwali-corporate-gift-ideas`
2. `best-corporate-gift-ideas-employees-india`
3. `corporate-gifting-ideas-client-appreciation`
4. `bulk-corporate-gifting-cost-quality-customization`
5. `corporate-gifts-new-employee-onboarding`

### 2.5 Add prices and MOQ to catalogue

**Problem:** Catalogue shows gallery names like "2 in 1", "3 in 1" with no context. A buyer can't shortlist you without knowing price range, MOQ, or what's included.

**File:** Catalogue page — add info below each card:
```html
<!-- Example upgrade for a catalogue card: -->
<a href="#" class="catalogue-card" data-gallery="images/catalogs/combo box/2 in 1">
    <div class="catalogue-card-icon">📄</div>
    <h3>2-in-1 Gift Set</h3>
    <p class="catalogue-desc">Pen + Diary combo with custom branding</p>
    <p class="catalogue-price">Starting ₹350/set · MOQ: 25</p>
    <span class="view-pdf">View Gallery</span>
</a>
```

You don't need exact prices — "Starting from ₹X" ranges are enough to qualify buyers before they fill the form.

---

## PRIORITY 3 — MEDIUM (Next 30 days, competitive improvements)

### 3.1 Add Article schema to all blog posts

**Problem:** Blog posts have no structured data. You're missing rich snippet opportunities in Google.

**Add to `<head>` of each blog post:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Diwali Corporate Gift Ideas That Stand Out (2026 Guide)",
  "description": "Discover unique Diwali corporate gift ideas that go beyond traditional sweets.",
  "author": {
    "@type": "Organization",
    "name": "HANDPIKD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "HANDPIKD",
    "logo": {
      "@type": "ImageObject",
      "url": "https://handpikd.co/images/logo.png"
    }
  },
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-01",
  "mainEntityOfPage": "https://handpikd.co/blogs/diwali-corporate-gift-ideas"
}
</script>
```

### 3.2 Add FAQ schema to top 5 blog posts

**Helps win "People also ask" snippets in Google. Add to each blog's `<head>`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best Diwali corporate gift ideas under ₹1000?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Popular options include artisan diya sets, quality dry fruit boxes, branded chocolate hampers, desk plants, and premium notebooks with custom branding."
      }
    },
    {
      "@type": "Question",
      "name": "How far in advance should I order Diwali corporate gifts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Order at least 4-6 weeks before Diwali for standard gifts, and 8 weeks for custom branded items to allow time for design, production, and delivery."
      }
    }
  ]
}
</script>
```

### 3.3 Add client logo strip to homepage

**File:** `index.html` — add after the hero section or inside the about section:
```html
<div class="client-logos" style="text-align: center; padding: 40px 0; background: #f8f6f3;">
    <p style="font-size: 14px; color: #888; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Trusted by teams at</p>
    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 40px; opacity: 0.6;">
        <img src="images/clients/logo1.png" alt="Client Name" style="height: 32px;">
        <img src="images/clients/logo2.png" alt="Client Name" style="height: 32px;">
        <img src="images/clients/logo3.png" alt="Client Name" style="height: 32px;">
        <!-- Add real client logos -->
    </div>
</div>
```

Ask your existing clients (Flox Tech, Biz Consulting, Marque Enterprises) for permission to use their logos.

### 3.4 Add blog images and visual content

**Problem:** Blog posts are walls of text with zero images. The Diwali blog is 1,300+ words with no visuals.

**For each blog post, add:**
- 1 hero/feature image at the top (your actual product photo matching the topic)
- 1 product image every 300-400 words showing relevant HANDPIKD gifts
- Alt text with keywords (e.g., `alt="HANDPIKD Diwali corporate gift hamper with branded chocolates and dry fruits"`)

### 3.5 Set up GA4 conversion events

**Problem:** You have GA4 tracking but likely no conversion events set up.

**Add to `script.js` — track form submissions and WhatsApp clicks:**
```javascript
// Track form submissions
document.querySelectorAll('.modal-form').forEach(form => {
    form.addEventListener('submit', function() {
        gtag('event', 'generate_lead', {
            event_category: 'form',
            event_label: 'enquiry_form'
        });
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        gtag('event', 'contact', {
            event_category: 'whatsapp',
            event_label: 'whatsapp_click'
        });
    });
});

// Track catalogue views
document.querySelectorAll('.catalogue-card').forEach(card => {
    card.addEventListener('click', function() {
        gtag('event', 'view_item', {
            event_category: 'catalogue',
            event_label: this.querySelector('h3')?.textContent
        });
    });
});
```

---

## PRIORITY 4 — NICE TO HAVE (When you have time)

### 4.1 Add a robots.txt and sitemap.xml

```
# robots.txt (place at root)
User-agent: *
Allow: /
Sitemap: https://handpikd.co/sitemap.xml
```

Create a `sitemap.xml` listing all pages: homepage, catalogue, blogs-list, and all 21 blog post URLs.

### 4.2 Add breadcrumbs to blog posts

Helps SEO and user navigation:
```html
<nav aria-label="Breadcrumb" style="font-size: 13px; color: #888; margin-bottom: 16px;">
    <a href="/" style="color: #888;">Home</a> →
    <a href="/blogs/blogs-list" style="color: #888;">Blog</a> →
    <span>Diwali Corporate Gift Ideas</span>
</nav>
```

### 4.3 Add a "Get a Free Quote" sticky CTA on mobile

A floating WhatsApp button that stays visible as users scroll blog posts:
```html
<a href="https://wa.me/917411690399?text=Hi%2C%20I%20want%20to%20discuss%20corporate%20gifting"
   style="position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; padding: 14px 20px; border-radius: 50px; text-decoration: none; font-weight: 600; box-shadow: 0 2px 12px rgba(0,0,0,0.15); z-index: 999; display: none;"
   class="mobile-whatsapp-cta">
    💬 Get a Quote
</a>
<script>
// Show only on mobile
if (window.innerWidth < 768) {
    document.querySelector('.mobile-whatsapp-cta').style.display = 'block';
}
</script>
```

### 4.4 Add `loading="lazy"` to all below-fold images

Improves page speed score:
```html
<img src="images/..." alt="..." loading="lazy">
```

Apply to all images except the hero and logo.

---

## Quick reference: file change map

| File | Changes needed |
|------|---------------|
| `index.html` | Canonical URL, schema URLs, meta description, email, footer blog link, stock photo, OG tags, client logos, GA events |
| `catalogue` page | Canonical URL, OG tags, product descriptions + prices, dead social links |
| `blogs/blogs-list` page | Canonical URL, OG tags, dead social links |
| All 21 blog posts | Canonical URLs, OG tags, Article schema, inline CTAs, product images, dead social links |
| `script.js` | GA4 conversion event tracking |
| Root | Add `robots.txt`, `sitemap.xml`, `og-preview.png` |

---

*Generated April 2026 — HANDPIKD website audit by marketing analysis session*