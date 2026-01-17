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

Before deploying, ensure:
- API URL is updated in JavaScript files (if hardcoded)
- All external CDN links are working
- Environment variables are set (if needed)

## 🌐 Live Website

Once deployed, your website will be available at:
- Vercel: `https://your-project.vercel.app`

## 📞 Support

For issues or questions, please contact the development team.

---

**Note:** This repository contains only public-facing website files. Admin and backend files are in separate repositories.

