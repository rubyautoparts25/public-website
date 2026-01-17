// API Configuration
// Update this URL to your production backend API
// For Vercel deployment, set this to your deployed backend URL (Railway, Render, etc.)

// Development (local)
// window.API_BASE_URL = 'http://localhost:3000/api';

// Production - Update this with your actual backend URL
// Example: window.API_BASE_URL = 'https://your-backend.railway.app/api';
// Example: window.API_BASE_URL = 'https://your-backend.render.com/api';

// Set default if not already set
if (typeof window.API_BASE_URL === 'undefined') {
    // Production API URL (Railway)
    window.API_BASE_URL = 'https://server-side-production-7658.up.railway.app/api';
}

