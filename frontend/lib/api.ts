import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://pitchdeck-ddnd.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false, // Changed to false as we're not using session cookies yet
});

// Add interceptors if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CORS headers to every request
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    config.headers["Access-Control-Allow-Headers"] =
      "Origin, X-Requested-With, Content-Type, Accept, Authorization";

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside the range of 2xx
      console.error("Response error:", error.response.data);
      console.error("Status code:", error.response.status);

      // Handle unauthorized errors (401)
      if (error.response.status === 401) {
        // Clear token and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          // Uncomment if you want automatic redirect
          // window.location.href = '/auth/login';
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error - no response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
