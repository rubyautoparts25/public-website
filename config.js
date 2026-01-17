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
    // Default to localhost for development
    // For production, update this or set via environment variable
    window.API_BASE_URL = 'http://localhost:3000/api';
    
    // If deployed on Vercel, you can use environment variables
    // Vercel exposes env vars via process.env, but for client-side, you'd need to
    // inject them during build or use a config endpoint
}

