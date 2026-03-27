# Rental Application Form

A beautiful, professional rental application form built with HTML, CSS, and vanilla JavaScript. The form includes all fields from the original Google Form and sends submissions to multiple email form backends in parallel for higher reliability.

## Features

- ✅ All fields from the original Google Form
- ✅ Beautiful, modern, and responsive design (Black & Gold theme)
- ✅ Form validation and conditional field display
- ✅ Parallel delivery via FormSubmit + Web3Forms + Static Forms
- ✅ Professional UI/UX
- ✅ GitHub Pages ready

## Setup Instructions

### 1. Configure Provider Endpoints

1. Open `index.html` in your editor
2. Find the `<form>` tag (around line 30)
3. Configure the provider attributes:

```html
<form
  id="rentalForm"
  class="rental-form"
  action="https://formsubmit.co/your-email@gmail.com"
  method="POST"
  data-formsubmit-endpoint="https://formsubmit.co/ajax/your-email@gmail.com"
  data-web3forms-endpoint="https://api.web3forms.com/submit"
  data-web3forms-access-key="YOUR_WEB3FORMS_ACCESS_KEY"
  data-staticforms-endpoint="https://api.staticforms.dev/submit"
  data-staticforms-api-key="YOUR_STATICFORMS_API_KEY"
>
```

This setup requires all three providers to be configured for simultaneous multi-send reliability.

### 2. Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select your branch (usually `main` or `master`)
4. Your form will be live at `https://yourusername.github.io/repository-name/`

### 3. Test Your Form

1. Fill out and submit the form
2. Check your email - you'll receive the application details
3. Check delivery logs/inbox for each configured provider

## Why Parallel Providers?

- ✅ **Higher reliability** - one provider outage does not block submission delivery
- ✅ **Static-host friendly** - works on GitHub Pages/Netlify/Vercel
- ✅ **No backend required** - browser sends directly to form provider APIs
- ✅ **Flexible setup** - enable one, two, or all three providers

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

## How Submission Works

1. User fills out and submits the form
2. Browser sends the same payload to all configured providers simultaneously
3. Any successful provider confirms the submission
4. You receive one email per successful provider

## Customization Options

### Change Email Subject

You can customize the subject by editing `buildProviderRequests()` in `script.js`:

```javascript
const subject = `New Rental Application from ${formDataObj.name || 'Applicant'}`;
```

### Enable/Disable Providers

Set any provider data attribute to a `YOUR_...` placeholder (or empty) to skip it at runtime.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Not receiving emails?

1. Check your spam/junk folder
2. Verify all provider endpoints/keys in the `<form>` tag
3. Check provider limits and verification status
4. Confirm at least one provider responds with HTTP 200 in browser dev tools

### Form not submitting?

1. Check browser console for JavaScript errors
2. Verify the form action URL is correct
3. Ensure all required fields are filled
4. Check your internet connection

### Getting spam?

Each provider has independent spam controls:
1. Enable CAPTCHA/honeypot where available
2. Add domain allowlists (where supported)
3. Monitor and block abusive senders in each provider dashboard

## Provider Links

- FormSubmit: https://formsubmit.co/
- Web3Forms: https://web3forms.com/
- Static Forms: https://www.staticforms.dev/

## Security & Privacy

- Applicant data is sent to each configured provider
- Review each provider privacy policy before enabling it in production

## License

This project is open source and available for use.

## Credits

- Form submission powered by [FormSubmit](https://formsubmit.co/), [Web3Forms](https://web3forms.com/), and [Static Forms](https://www.staticforms.dev/)
- Design: Custom Black & Gold theme
- Icons: SVG inline icons
