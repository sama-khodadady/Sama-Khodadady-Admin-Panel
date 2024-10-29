import axios from "axios";
import { getCookie } from "../utils/cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (request) => {
    const token = getCookie();
    if (token) request.headers["Authorization"] = `bearer ${token}`;

    return request;
  },
  (error) => Promise.reject(error)
);

export default api;
