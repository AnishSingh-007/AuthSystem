import api from "./axiosClient"

export const getActiveSessions = () => {
    return api.get("/sessions")
}

export const revokeSession = (id) => {
    return api.delete(`/sessions/${id}`)
}

export const getTrustedDevices = () => {
    return api.get("/devices/trusted")
}

export const revokeDevice = (id) => {
    return api.delete(`/devices/${id}`)
}

export const trustDevice = (id) => {
    return api.post(`/devices/${id}/trust`)
}