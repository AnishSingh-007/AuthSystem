import api from "./axiosClient"

export const getSocOverview = () => {
    return api.get("/admin/soc-overview")
}

export const getAuditLogs = () => {
    return api.get("/admin/audit-logs")
}

export const getSecurityEvents = () => {
    return api.get("/admin/security-events")
}

export const getBlockedIPs = () => {
    return api.get("/admin/blocked-ips")
}