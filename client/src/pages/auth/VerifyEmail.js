// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { verifyEmailAPI } from "../features/auth/authAPI";

// const VerifyEmail = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get("token");

//   const [status, setStatus] = useState("Verifying...");

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         const res = await verifyEmailAPI(token);
//         setStatus(res.data.message || "Email verified successfully!");
//         setTimeout(() => navigate("/login"), 2000);
//       } catch (err) {
//         setStatus(err.response?.data?.message || "Verification failed");
//       }
//     };

//     if (token) {
//       verify();
//     } else {
//       setStatus("Invalid verification link");
//     }
//   }, [token, navigate]);

//   return (
//     <div>
//       <h2>Email Verification</h2>
//       <p>{status}</p>
//     </div>
//   );
// };

// export default VerifyEmail;


import { useEffect, useState } from "react"
import { verifyEmail } from "../../api/authApi"

export default function VerifyEmail() {

    const [status, setStatus] = useState("Verifying...")

    useEffect(() => {

        const token = new URLSearchParams(window.location.search).get("token")

        verifyEmail(token)
            .then(() => setStatus("Email verified successfully"))
            .catch(() => setStatus("Verification failed"))

    }, [])

    return (

        <div style={{ textAlign: "center", marginTop: "100px" }}>

            <h2>{status}</h2>

            <a href="/login">Go to Login</a>

        </div>

    )
}