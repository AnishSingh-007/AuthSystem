import { useDispatch } from "react-redux"
import { logoutThunk } from "../../features/auth/authThunks"

export default function LogoutButton() {

    const dispatch = useDispatch()

    const logout = () => {

        dispatch(logoutThunk())

        window.location.href = "/login"

    }

    return <button onClick={logout}>Logout</button>

}