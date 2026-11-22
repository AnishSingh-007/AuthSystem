// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { fetchProfile } from "./features/auth/authSlice";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// // import Admin from "./pages/Admin";
// import VerifyEmail from "./pages/VerifyEmail";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const dispatch = useDispatch();

//   // Try to rehydrate session on app load
//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <Admin />
//             </ProtectedRoute>
//           }
//         /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadUserThunk } from "./features/auth/authThunks"

function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(loadUserThunk())

  }, [])

  return (

    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;