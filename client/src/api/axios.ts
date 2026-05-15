import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_API_URL || "http://localhost:1001",
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
