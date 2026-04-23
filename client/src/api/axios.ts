import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_API_URL || "http://localhost:1001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;