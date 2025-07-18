// For development
const BASE_URL = "http://localhost:5000/api";

// For production (use env variable later)
const PROD_URL = "https://your-backend.onrender.com/api";

// Export based on NODE_ENV
const API = import.meta.env.MODE === "production" ? PROD_URL : BASE_URL;

export default API;
