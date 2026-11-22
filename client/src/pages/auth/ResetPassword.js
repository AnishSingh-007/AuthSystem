// import React, { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { resetPasswordAPI } from "../features/auth/authAPI";

// const ResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get("token");

//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       setError("Invalid reset link");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       const res = await resetPasswordAPI(token, { newPassword });
//       setMessage(res.data.message || "Password reset successful");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>

//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from "react"
import { resetPassword } from "../../api/authApi"
import { Input, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function ResetPassword() {

    const [password, setPassword] = useState("")

    const token = new URLSearchParams(window.location.search).get("token")

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await resetPassword(token, { newPassword: password })

            toast.success("Password updated")

            window.location.href = "/login"

        } catch {

            toast.error("Reset failed")

        }

    }

    return (

        <Card>

            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>

                <Input
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <Button type="submit">Update Password</Button>

            </form>

        </Card>

    )
}