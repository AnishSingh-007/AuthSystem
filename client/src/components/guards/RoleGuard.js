import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { selectRoles } from "../../features/auth/authSelectors"

export default function RoleGuard({ roles }) {

    const userRoles = useSelector(selectRoles)

    const allowed = userRoles?.some(r => roles.includes(r))

    if (!allowed) {
        return <Navigate to="/unauthorized" />
    }

    return <Outlet />

}