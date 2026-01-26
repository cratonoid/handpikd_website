# EmailJS Setup Guide

The old SMTP.js service is not working. I've switched to EmailJS which is more reliable and free.

## Quick Setup Steps:

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE - 200 emails/month)
3. Verify your email

### 2. Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and authorize your Gmail (handpikdgifting@gmail.com or alvisabreo.00@gmail.com)
5. Note your **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Template Name:** handpikd_inquiry

**Subject:** New Inquiry from HANDPIKD Website

**Content:**

```
New inquiry received from HANDPIKD website:

Time: {{timestamp}}
Name: {{name}}
Email: {{email}}
WhatsApp Number: {{phone}}
Occasion/Event Type: {{occasion}}
Approximate Quantity: {{quantity}}
Budget Range: {{budget}}

Message:
{{message}}
```

4. Set **To Email:** {{to_email}}
5. Click **Save**
6. Note your **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abc123XYZ`)

### 5. Update Your Website

#### In index.html (line ~16):

Replace:

```javascript
publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
```

with:

```javascript
publicKey: "your-actual-public-key",
```

#### In script.js (lines ~8-9):

Replace:

```javascript
serviceID: "YOUR_SERVICE_ID",
templateID: "YOUR_TEMPLATE_ID",
```

with:

```javascript
serviceID: "service_abc123",  // Your actual service ID
templateID: "template_xyz789",  // Your actual template ID
```

### 6. Test It!

1. Save all files
2. Refresh your website
3. Submit a test form
4. Check:
   - Your email inbox (should receive notification)
   - Your Google Sheet (should have new row)
   - Browser console for any errors

## Why EmailJS?

- ✅ More reliable than SMTP.js
- ✅ Better security (no credentials in frontend)
- ✅ Free tier: 200 emails/month
- ✅ Easy Gmail integration
- ✅ Professional service with good documentation

## Current Status:

- ✅ Google Sheets integration: **Working**
- ⏳ Email notifications: **Needs EmailJS setup** (takes 5 minutes)

The form will still work and save to Google Sheets even without email setup. Email is optional but recommended for instant notifications.
