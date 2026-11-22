import React from "react";
import { useSelector } from "react-redux";

const RoleGate = ({ allowedRoles, children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  const hasRole = user.roles.some((r) => allowedRoles.includes(r));

  if (!hasRole) return <p>❌ You are not authorized</p>;

  return children;
};

export default RoleGate;