// import React, { useState } from "react";
// import { registerAPI } from "../features/auth/authAPI";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);
//     try {
//       const res = await registerAPI(form);
//       setMessage(res.data.message || "Registered successfully. Check your email.");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react"
import { registerUser } from "../../api/authApi"
import { Input, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await registerUser({ name, email, password })

            toast.success("Registration successful. Check email.")

            window.location.href = "/login"

        } catch (err) {

            toast.error(err.response?.data?.message)

        }

    }

    return (

        <div className="auth-container">

            <Card>

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <Input
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

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

                    <Button type="submit">Register</Button>

                </form>

            </Card>

        </div>

    )
}