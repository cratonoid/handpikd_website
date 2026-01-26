# Form Submission Setup Guide

Your forms are now configured to send data via SMTP email and Google Sheets. Follow these steps to complete the setup:

## 1. SMTP Email Setup (Using SMTP.js)

### Option A: Using ElasticEmail (Recommended - Free tier available)

1. Go to [https://elasticemail.com/](https://elasticemail.com/) and create a free account
2. Verify your email address (handpikdgifting@gmail.com)
3. Go to Settings → SMTP/API → Create SMTP credentials
4. Note your SMTP username and password
5. Go to [https://smtpjs.com/](https://smtpjs.com/)
6. Enter your SMTP details:
   - SMTP Server: smtp.elasticemail.com
   - Port: 2525
   - Username: Your ElasticEmail email
   - Password: Your ElasticEmail SMTP password
   - From: handpikdgifting@gmail.com
   - To: handpikdgifting@gmail.com
7. Click "Generate Secure Token"
8. Copy the secure token

### Option B: Using Gmail SMTP (Alternative)

1. Enable 2-Step Verification on your Gmail account
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate an app password for "Mail"
4. Go to [https://smtpjs.com/](https://smtpjs.com/)
5. Enter:
   - SMTP Server: smtp.gmail.com
   - Port: 587
   - Username: handpikdgifting@gmail.com
   - Password: Your app password (16 characters)
   - From: handpikdgifting@gmail.com
   - To: handpikdgifting@gmail.com
6. Generate and copy the secure token

### Update script.js with your token:

Open `script.js` and find line ~3, replace:

```javascript
SecureToken: "YOUR_SMTP_SECURE_TOKEN",
```

with:

```javascript
SecureToken: "your-actual-secure-token-here",
```

## 2. Google Sheets Setup

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet named "HANDPIKD Form Submissions"
3. In the first row, add these headers:
   - A1: Timestamp
   - B1: Name
   - C1: Email
   - D1: WhatsApp Number
   - E1: Occasion
   - F1: Quantity
   - G1: Budget Range
   - H1: Message

### Step 2: Create Apps Script

1. In your Google Sheet, go to Extensions → Apps Script
2. Delete any code in the editor
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.occasion,
      data.quantity,
      data.budget,
      data.message,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Data saved successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the disk icon to save (or Ctrl+S)
5. Name the project "HANDPIKD Form Handler"

### Step 3: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Click the gear icon next to "Select type" → Choose "Web app"
3. Set the following:
   - Description: "HANDPIKD form submission handler"
   - Execute as: "Me"
   - Who has access: "Anyone" (important!)
4. Click "Deploy"
5. Click "Authorize access" and grant permissions
6. Copy the Web App URL (it looks like: `https://script.google.com/macros/s/ABC.../exec`)

### Step 4: Update script.js

Open `script.js` and find line ~4, replace:

```javascript
googleSheetsUrl: "YOUR_GOOGLE_SHEETS_WEB_APP_URL",
```

with:

```javascript
googleSheetsUrl: "https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec",
```

## 3. Testing

1. Save all files
2. Open your website in a browser
3. Fill out and submit a form
4. Check:
   - Your email inbox for the notification
   - Your Google Sheet for the new row
   - Browser console (F12) for any errors

## 4. Troubleshooting

### Emails not sending?

- Verify your SMTP secure token is correct
- Check browser console for errors
- Make sure SMTP.js script is loaded (check Network tab in DevTools)
- Try regenerating the secure token

### Google Sheets not updating?

- Check the Apps Script deployment URL is correct
- Make sure "Who has access" is set to "Anyone"
- Check browser console for CORS errors (this is normal with "no-cors" mode)
- Manually check your Google Sheet - data should still be added despite CORS

### Form shows error message?

- Open browser console (F12) to see detailed error
- Check network requests to see which service failed
- Verify both URLs are correctly configured in script.js

## 5. Security Notes

- The secure token from SMTP.js is encrypted and safe to use in frontend
- Google Sheets Web App URL is public but can only append data (not read/modify)
- Consider implementing rate limiting or CAPTCHA for production
- Monitor your email sending quota (ElasticEmail free: 100 emails/day)

## 6. Email Notification Format

Recipients will receive emails with this format:

```
New inquiry received from HANDPIKD website:

Time: 27/01/2026, 10:30:45 AM
Name: John Doe
Email: john@example.com
WhatsApp Number: +91 98765 43210
Occasion/Event Type: Corporate Event
Approximate Quantity: 50
Budget Range: ₹2,500 - ₹5,000 per gift
Message: Looking for corporate gifts for annual conference...
```

---

**Need Help?**

- SMTP.js Documentation: https://smtpjs.com/
- Google Apps Script: https://developers.google.com/apps-script
- ElasticEmail Support: https://elasticemail.com/support
