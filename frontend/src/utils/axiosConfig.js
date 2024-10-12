// src/axiosConfig.js
import axios from "axios";

// Create an instance of axios with custom settings
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // Replace with your base URL
  timeout: 10000, // Optional: specify a timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need here, e.g., Authorization
  },
});

// Optionally, add interceptors for requests and responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config if needed, e.g., adding tokens
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here, like logging them or showing alerts
    return Promise.reject(error);
  }
);

export default axiosInstance;
