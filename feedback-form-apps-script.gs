function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Save to sheet — column order must match the sheet's header row
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.firm,
      data.email,
      data.order_date,
      data.order_contents,
      data.order_contents_other,
      data.overall_rating,
      data.quality_products,
      data.presentation_packaging,
      data.value_for_money,
      data.delivery_timing,
      data.improve_most,
      data.order_again,
      data.occasions,
      data.occasions_other,
      data.future_preferences,
      data.additional_comments
    ]);

    // Send email notification
    try {
      const emailBody = `New feedback received from HANDPIKD website:

Time: ${data.timestamp}
Name: ${data.name}
Firm / Department: ${data.firm}
Email: ${data.email}
Date of Order: ${data.order_date}

Contents of Order: ${data.order_contents}${data.order_contents_other ? ` (Other: ${data.order_contents_other})` : ''}

1. Overall experience: ${data.overall_rating}

2. Ratings —
   Quality of products: ${data.quality_products}
   Presentation & packaging: ${data.presentation_packaging}
   Value for money: ${data.value_for_money}
   Delivery & timing: ${data.delivery_timing}

3. Could improve most: ${data.improve_most}
4. Would order again: ${data.order_again}

5. Future occasions: ${data.occasions}${data.occasions_other ? ` (Other: ${data.occasions_other})` : ''}
6. Future preferences: ${data.future_preferences}

7. Additional comments:
${data.additional_comments}

---
This is an automated notification from your website feedback form.`;

      MailApp.sendEmail({
        to: "alvisabreo.00@gmail.com",
        subject: "New Feedback from HANDPIKD Website",
        body: emailBody,
        name: "Handpikd Feedback"
      });
    } catch (emailError) {
      Logger.log("Email error: " + emailError);
      // Don't fail the whole request if email fails
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Feedback saved and email sent successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
