import api from "./axiosClient"

export const getIPRules = () => {
    return api.get("/admin/ip-rules")
}

export const addIPRule = (data) => {
    return api.post("/admin/ip-rules", data)
}

export const deleteIPRule = (id) => {
    return api.delete(`/admin/ip-rules/${id}`)
}

export const getThrottleStats = () => {
    return api.get("/admin/login-throttle")
}

export const getRecoveryCodeStats = () => {
    return api.get("/admin/recovery-code-usage")
}

export const getSecurityAlerts = () => {
    return api.get("/admin/security-alerts")
}