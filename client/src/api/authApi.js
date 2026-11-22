import api from "./axiosClient"

export const loginUser = (data)=>{
return api.post("/auth/login",data)
}

export const registerUser = (data)=>{
return api.post("/auth/register",data)
}

export const verifyEmail = (token)=>{
return api.get(`/auth/verify-email?token=${token}`)
}

export const forgotPassword = (data)=>{
return api.post("/auth/forgot-password",data)
}

export const resetPassword = (token,data)=>{
return api.post(`/auth/reset-password?token=${token}`,data)
}

export const logoutUser = ()=>{
return api.post("/auth/logout")
}

export const verify2FA = (data)=>{
return api.post("/auth/verify-2fa",data)
}