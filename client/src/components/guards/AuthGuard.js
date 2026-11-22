import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { selectAuth } from "../../features/auth/authSelectors"

export default function AuthGuard() {

    const isAuth = useSelector(selectAuth)

    if (!isAuth) {
        return <Navigate to="/login" />
    }

    return <Outlet />

}