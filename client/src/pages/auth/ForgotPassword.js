// import React, { useState } from "react";
// import { forgotPasswordAPI } from "../features/auth/authAPI";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       const res = await forgotPasswordAPI({ email });
//       setMessage(res.data.message || "If account exists, reset link sent.");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>

//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState } from "react"
import { forgotPassword } from "../../api/authApi"
import { Input, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function ForgotPassword() {

    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await forgotPassword({ email })

            toast.success("Reset email sent")

        } catch (err) {

            toast.error("Failed")

        }

    }

    return (

        <div className="auth-container">

            <Card>

                <h2>Forgot Password</h2>

                <form onSubmit={handleSubmit}>

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <Button type="submit">Send Reset Link</Button>

                </form>

            </Card>

        </div>

    )
}