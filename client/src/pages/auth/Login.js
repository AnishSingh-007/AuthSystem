// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../features/auth/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;


import { useState } from "react"
import { loginUser } from "../../api/authApi"
import { Input, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            setLoading(true)

            const res = await loginUser({ email, password })

            if (res.data.requires2FA) {
                window.location.href = "/2fa"
                return
            }

            toast.success("Login successful")

            window.location.href = "/dashboard"

        } catch (err) {

            toast.error(err.response?.data?.message || "Login failed")

        }

        setLoading(false)
    }

    return (

        <div className="auth-container">

            <Card>

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>

                <p>
                    Forgot password?
                    <a href="/forgot-password">Reset</a>
                </p>

                <p>
                    New user?
                    <a href="/register">Register</a>
                </p>

                <Button
                    variant="outline"
                    onClick={() => window.location.href = "/api/auth/google"}
                >
                    Login with Google
                </Button>

            </Card>

        </div>

    )
}