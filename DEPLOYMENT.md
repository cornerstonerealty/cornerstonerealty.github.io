# Deployment Guide for GitHub Pages

This form is designed to work on static hosting services like GitHub Pages. **No server-side code needed!**

## Quick Start for GitHub Pages

1. **Update your email** in `index.html` (line 30):
   ```html
   <form action="https://formsubmit.co/your-email@gmail.com" method="POST">
   ```

2. **Push to GitHub**

3. **Enable GitHub Pages** in repository settings

That's it! The form will work immediately.

## Why FormSubmit?

✅ **Completely Free** - No signup, no credit card, no limits  
✅ **No Configuration** - Just add your email address  
✅ **Works Everywhere** - Any static hosting service  
✅ **Instant Setup** - 30 seconds to configure  

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

## FormSubmit vs Other Services

| Feature | FormSubmit | EmailJS | PHP |
|---------|-----------|---------|-----|
| **Cost** | Free | Free (200/month) | Free |
| **Signup Required** | ❌ No | ✅ Yes | N/A |
| **Configuration** | 1 line | Multiple steps | Server setup |
| **GitHub Pages** | ✅ Works | ✅ Works | ❌ No |
| **Setup Time** | 30 seconds | 5-10 minutes | 30+ minutes |

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
- Verify email address in form action
- Try a different email provider (Gmail works best)

**Form not working?**
- Check browser console for errors
- Verify form action URL is correct
- Ensure FormSubmit service is accessible

## Security Notes

- FormSubmit is a trusted service
- Your email is only used for delivery
- No sensitive data is stored
- All submissions are encrypted in transit
