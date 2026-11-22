// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import RoleGate from "../../components/RoleGate";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome {user?.name}</p>

//       <button onClick={() => dispatch(logout())}>Logout</button>

//       <RoleGate allowedRoles={["admin"]}>
//         <p>👑 Admin only content here</p>
//       </RoleGate>

//       <RoleGate allowedRoles={["developer", "security_expert"]}>
//         <p>🛠 Dev/Security content here</p>
//       </RoleGate>
//     </div>
//   );
// };

// export default Dashboard;

import MainLayout from "../../components/layout/MainLayout"
import Card from "../../components/ui/Card/Card"

export default function Dashboard() {

  return (

    <MainLayout>

      <h2>Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>

        <Card>
          <h4>Total Sessions</h4>
          <p>--</p>
        </Card>

        <Card>
          <h4>Active Devices</h4>
          <p>--</p>
        </Card>

        <Card>
          <h4>Security Alerts</h4>
          <p>--</p>
        </Card>

      </div>

    </MainLayout>

  )

}