# Rental Application Form

A beautiful, professional rental application form built with HTML, CSS, and vanilla JavaScript. The form includes all fields from the original Google Form and sends submissions via email using **FormSubmit** - a completely free service with no signup required!

## Features

- ✅ All fields from the original Google Form
- ✅ Beautiful, modern, and responsive design (Black & Gold theme)
- ✅ Form validation and conditional field display
- ✅ Email submission via FormSubmit (100% free, no signup!)
- ✅ Professional UI/UX
- ✅ GitHub Pages ready

## Setup Instructions (Super Simple!)

### 1. Configure Your Email

1. Open `index.html` in your editor
2. Find the `<form>` tag (around line 30)
3. Replace `YOUR_EMAIL@example.com` with your actual email address:

```html
<form id="rentalForm" class="rental-form" action="https://formsubmit.co/your-email@gmail.com" method="POST">
```

That's it! **No signup, no API keys, no configuration files needed!**

### 2. Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select your branch (usually `main` or `master`)
4. Your form will be live at `https://yourusername.github.io/repository-name/`

### 3. Test Your Form

1. Fill out and submit the form
2. Check your email - you'll receive the application details
3. FormSubmit sends emails directly to your inbox

## Why FormSubmit?

- ✅ **100% Free** - No credit card, no signup required
- ✅ **Unlimited Submissions** - No monthly limits
- ✅ **No Configuration** - Just add your email address
- ✅ **Works Everywhere** - GitHub Pages, Netlify, Vercel, anywhere!
- ✅ **Spam Protection** - Built-in spam filtering
- ✅ **Email Notifications** - Get notified instantly

## File Structure

```
rentalApp/
├── index.html          # Main form HTML
├── styles.css          # Styling
├── script.js           # Form handling and validation
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Form Fields

The form includes all fields from the original Google Form:

- Personal Information (Name, DOB, Email, Phone, Relationship)
- Current Address
- Other Occupant, Pets, Vehicle, Smoking
- Background Information (Convictions, Lease History, Bankruptcy)
- Previous Landlord Information
- Employment Information
- Rental Details (Move-in/out dates, timelines, payment method)
- Certification and Signature

## How FormSubmit Works

1. User fills out and submits the form
2. Form data is sent to FormSubmit's servers
3. FormSubmit formats the data and emails it to you
4. You receive a nicely formatted email with all application details

## Customization Options

### Change Email Subject

You can customize the email subject by modifying the JavaScript in `script.js` (around line 250):

```javascript
subjectField.value = `Your Custom Subject - ${formDataObj.name}`;
```

### Add CC or BCC

Add hidden fields to the form:

```html
<input type="hidden" name="_cc" value="another-email@example.com">
<input type="hidden" name="_bcc" value="backup-email@example.com">
```

### Custom Reply-To

Add to form:

```html
<input type="hidden" name="_replyto" value="{{email}}">
```

This will set the reply-to address to the applicant's email.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Not receiving emails?

1. Check your spam/junk folder
2. Verify the email address in the form action is correct
3. Check FormSubmit status at https://formsubmit.co/status
4. Some email providers may block automated emails - try a different email provider

### Form not submitting?

1. Check browser console for JavaScript errors
2. Verify the form action URL is correct
3. Ensure all required fields are filled
4. Check your internet connection

### Getting spam?

FormSubmit has built-in spam protection, but if you're getting spam:
1. Add a CAPTCHA (FormSubmit supports reCAPTCHA)
2. Use FormSubmit's honeypot field
3. Enable additional spam filters in FormSubmit settings

## Alternative: Multiple Recipients

To send to multiple emails, separate them with commas in the form action:

```html
action="https://formsubmit.co/email1@example.com,email2@example.com"
```

## Security & Privacy

- FormSubmit is a trusted service used by thousands of websites
- Your email address is only used to send form submissions
- Form data is encrypted in transit
- No data is stored by FormSubmit (emails are sent and deleted)

## License

This project is open source and available for use.

## Credits

- Form submission powered by [FormSubmit](https://formsubmit.co/) - Free form backend service
- Design: Custom Black & Gold theme
- Icons: SVG inline icons
