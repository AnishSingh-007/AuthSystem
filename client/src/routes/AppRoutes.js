import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import TwoFactorVerify from "../pages/auth/TwoFactorVerify";


import Unauthorized from "../pages/system/Unauthorized"
import ReAuth from "../pages/system/ReAuth"

import Dashboard from "../pages/dashboard/Dashboard"

import AuthGuard from "../components/guards/AuthGuard"
import RoleGuard from "../components/guards/RoleGuard"
import TrustGuard from "../components/guards/TrustGuard"

import Sessions from "../pages/security/Sessions"
import Devices from "../pages/security/Devices"
import LoginHistory from "../pages/security/LoginHistory"
import RecoveryCodes from "../pages/security/RecoveryCodes"
import SecurityCenter from "../pages/security/SecurityCenter"

import Users from "../pages/admin/Users"
import Roles from "../pages/admin/Roles"
import DeletedUsers from "../pages/admin/DeletedUsers"
import DevicesAdmin from "../pages/admin/DevicesAdmin"
import SuspiciousActivity from "../pages/admin/SuspiciousActivity"

import SocDashboard from "../pages/soc/SocDashboard"
import AuditCenter from "../pages/soc/AuditCenter"
import SecurityEvents from "../pages/soc/SecurityEvents"
import BlockedIPs from "../pages/soc/BlockedIPs"

import SessionManager from "../pages/session/SessionManager";
import DeviceManager from "../pages/session/DeviceManager";
import TrustedDevices from "../pages/session/TrustedDevices";

import IPControl from "../pages/security-controls/IPControl"
import LoginThrottleMonitor from "../pages/security-controls/LoginThrottleMonitor"
import RecoveryCodeManager from "../pages/security-controls/RecoveryCodeManager"
import SecurityAlerts from "../pages/security-controls/SecurityAlerts"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      {/* <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<div>Register</div>} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/2fa" element={<TwoFactorVerify />} />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/reauth" element={<ReAuth />} />

      <Route element={<AuthGuard />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<RoleGuard roles={["admin", "security_expert"]} />}>
          <Route path="/admin" element={<div>Admin Panel</div>} />
        </Route>

        <Route element={<TrustGuard />}>
          <Route path="/soc" element={<div>SOC Dashboard</div>} />
        </Route>

        <Route path="/sessions" element={<SessionManager />} />
        <Route path="/devices" element={<DeviceManager />} />
        <Route path="/trusted-devices" element={<TrustedDevices />} />

      </Route>

      <Route path="/sessions" element={<Sessions />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/login-history" element={<LoginHistory />} />
      <Route path="/recovery-codes" element={<RecoveryCodes />} />
      <Route path="/security" element={<SecurityCenter />} />

      <Route element={<RoleGuard roles={["admin", "security_expert"]} />}>
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/roles" element={<Roles />} />
        <Route path="/admin/deleted-users" element={<DeletedUsers />} />
        <Route path="/admin/devices" element={<DevicesAdmin />} />
        <Route path="/admin/suspicious" element={<SuspiciousActivity />} />
      </Route>

      <Route element={<TrustGuard />}>

        <Route path="/soc" element={<SocDashboard />} />
        <Route path="/soc/audit" element={<AuditCenter />} />
        <Route path="/soc/events" element={<SecurityEvents />} />
        <Route path="/soc/blocked-ips" element={<BlockedIPs />} />

      </Route>

      <Route element={<RoleGuard roles={["admin", "security_expert"]} />}>
        <Route path="/security/ip-control" element={<IPControl />} />
        <Route path="/security/throttle" element={<LoginThrottleMonitor />} />
        <Route path="/security/recovery-codes" element={<RecoveryCodeManager />} />
        <Route path="/security/alerts" element={<SecurityAlerts />} />
      </Route>

    </Routes>
  );
}