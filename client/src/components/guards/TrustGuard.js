import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { selectTrustLevel } from "../../features/auth/authSelectors"

export default function TrustGuard({ level = "high" }) {

    const trust = useSelector(selectTrustLevel)

    if (trust !== level) {
        return <Navigate to="/reauth" />
    }

    return <Outlet />

}