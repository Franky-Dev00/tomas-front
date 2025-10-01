import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const user = useAuthStore(state => state.user)
    if (!user) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await api.post("/auth/refresh")
        return api(originalRequest)
      } catch (err) {
        const setUser = useAuthStore(state => state.setUser)
        setUser(null)
        window.location.href = "/ingresar"
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export { api }
