import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_API_URL || "http://localhost:1001",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.request.use((config:any)=>{
  const token = localStorage.getItem("token");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
export default api;