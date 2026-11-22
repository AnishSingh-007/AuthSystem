import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectRoles } from "../../features/auth/authSelectors"

export default function Sidebar() {

    const roles = useSelector(selectRoles)

    const isAdmin = roles?.includes("admin")
    const isSecurity = roles?.includes("security_expert")

    return (

        <div className="sidebar">

            <h2 className="logo">SecureApp</h2>

            <nav>

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/sessions">Sessions</Link>

                <Link to="/devices">Devices</Link>

                <Link to="/login-history">Login History</Link>

                {isSecurity && (
                    <>
                        <Link to="/security">Security Center</Link>
                        <Link to="/soc">SOC Dashboard</Link>
                    </>
                )}

                {isAdmin && (
                    <>
                        <Link to="/admin/users">User Management</Link>
                        <Link to="/admin/roles">Role Management</Link>
                        <Link to="/admin/audit">Audit Center</Link>
                    </>
                )}

            </nav>

        </div>

    )

}