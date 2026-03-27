# Deployment Guide for GitHub Pages

This form is designed to work on static hosting services like GitHub Pages. **No server-side code needed!**
It now sends submissions to multiple providers in parallel for better delivery reliability.

## Quick Start for GitHub Pages

1. **Configure provider endpoints** in `index.html` on the `<form>` tag:
   ```html
   <form
     action="https://formsubmit.co/your-email@gmail.com"
     data-formsubmit-endpoint="https://formsubmit.co/ajax/your-email@gmail.com"
     data-web3forms-endpoint="https://api.web3forms.com/submit"
     data-web3forms-access-key="YOUR_WEB3FORMS_ACCESS_KEY"
     data-staticforms-endpoint="https://api.staticforms.dev/submit"
     data-staticforms-api-key="YOUR_STATICFORMS_API_KEY"
   >
   ```

2. **Push to GitHub**

3. **Enable GitHub Pages** in repository settings

This setup requires all 3 providers to be configured and sends to all 3 simultaneously.

## Provider Strategy

✅ **FormSubmit** - Easiest setup, no signup required  
✅ **Web3Forms** - Free tier with higher monthly allowance  
✅ **Static Forms** - Reliable API endpoint with free plan  
✅ **Parallel Send** - Browser sends to all configured providers at the same time

## Files Needed

✅ **Required:**
- `index.html`
- `styles.css`
- `script.js`

❌ **Not needed:**
- `send-email.php` (PHP doesn't work on GitHub Pages)
- `.env` file (not used with FormSubmit)
- `composer.json` (not needed for static hosting)
- `config.js` (not needed - email is in HTML)

## Provider Notes

- `FormSubmit`: Use `https://formsubmit.co/ajax/your-email@gmail.com` for AJAX requests.
- `Web3Forms`: Create an access key, then set `data-web3forms-access-key`.
- `Static Forms`: Use `https://api.staticforms.dev/submit` and set your `apiKey` from Static Forms dashboard.

## Deployment Steps

### GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/rentalApp.git
   git push -u origin main
   ```
3. Go to Settings → Pages
4. Select branch: `main`
5. Your site is live!

### Netlify

1. Drag and drop your folder to [Netlify](https://netlify.com)
2. Done! Your site is live.

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Done!

## Testing

After deployment:
1. Visit your live site
2. Fill out the form
3. Submit
4. Check your email inbox

## Troubleshooting

**Not receiving emails?**
- Check spam folder
- Verify all configured endpoints and keys are valid
- Confirm you submitted each provider's initial verification step (if required)
- Check each provider dashboard/limit status

**Form not working?**
- Check browser console for errors
- Verify form action URL is correct
- Ensure outbound requests to provider APIs are not blocked by browser extensions/network policy

## Security Notes

- You are posting applicant data to every configured provider
- Only enable providers you trust and review each provider privacy policy
