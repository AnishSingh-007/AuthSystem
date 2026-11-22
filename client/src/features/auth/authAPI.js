import api from "../../utils/axios";

export const loginAPI = (data) => api.post("/auth/login", data);
export const registerAPI = (data) => api.post("/auth/register", data);
export const logoutAPI = () => api.post("/auth/logout");
export const getProfileAPI = () => api.get("/protected/profile");

export const forgotPasswordAPI = (data) => api.post("/auth/forgot-password", data);
export const resetPasswordAPI = (token, data) =>
    api.post(`/auth/reset-password?token=${token}`, data);

export const verifyEmailAPI = (token) =>
    api.get(`/auth/verify-email?token=${token}`);