import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../features/auth/authSelectors"
import { logoutThunk } from "../../features/auth/authThunks"

export default function Topbar() {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutThunk())
        window.location.href = "/login"
    }

    return (

        <div className="topbar">

            <div className="topbar-left">
                <h3>Welcome {user?.name}</h3>
            </div>

            <div className="topbar-right">

                <span>{user?.email}</span>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </div>

    )

}