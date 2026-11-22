import api from "./axiosClient"

export const getSessions = () => {
    return api.get("/sessions")
}

export const revokeSession = (id) => {
    return api.delete(`/sessions/${id}`)
}

export const getDevices = () => {
    return api.get("/devices")
}

export const getLoginHistory = () => {
    return api.get("/login-history")
}

export const getRecoveryCodes = () => {
    return api.get("/auth/recovery-codes")
}