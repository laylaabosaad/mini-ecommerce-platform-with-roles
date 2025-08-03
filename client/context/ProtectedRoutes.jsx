import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function ProtectedRoutes({ children, roles }) {
  const { role, authenticated, loading } = useContext(UserContext);

  if (loading) return null;

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoutes;
