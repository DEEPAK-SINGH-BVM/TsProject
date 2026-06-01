import axios from "axios";
const api = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_API_URL || "https://tsproject-d7iu.onrender.com",
});
// An Axios request interceptor is a function that runs before every API call.
// It automatically adds the saved login token to the request header if it exists.
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;