# Ruby Auto Parts - Public Website

Public-facing website for Ruby Auto Parts. This repository contains the frontend files for the customer-facing website.

## 📁 Repository Structure

```
public-website/
├── index.html              # Homepage
├── category-parts.html     # Products/Category page
├── styles.css              # Main stylesheet
├── category-parts.css      # Category page styles
├── script.js               # Main JavaScript
├── category-parts.js       # Category page JavaScript
├── subcategories.js        # Subcategory handling
└── logo.jpeg               # Company logo
```

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import this GitHub repository
   - Vercel will auto-detect and deploy

2. **Or use Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```

### Important Notes

- **Backend API:** This frontend requires a backend API server (deployed separately)
- **Admin Section:** Admin files are in a separate repository/folder
- **API URL:** Update `admin/admin-utils.js` (if included) with your production API URL

## 🔗 Related Repositories

- **Admin Section:** Separate repository/folder for admin management
- **Backend API:** Separate repository for Node.js/Express server

## 📝 Configuration

### Before Deploying:

1. **Update API URL in `config.js`:**
   ```javascript
   // Change from:
   window.API_BASE_URL = 'http://localhost:3000/api';
   
   // To your production backend URL:
   window.API_BASE_URL = 'https://your-backend.railway.app/api';
   // or
   window.API_BASE_URL = 'https://your-backend.render.com/api';
   ```

2. **Ensure your backend API is deployed and accessible**

3. **Verify all external CDN links are working** (Font Awesome, Google Fonts)

## 🌐 Live Website

Once deployed, your website will be available at:
- Vercel: `https://your-project.vercel.app`

## 📞 Support

For issues or questions, please contact the development team.

---

**Note:** This repository contains only public-facing website files. Admin and backend files are in separate repositories.

