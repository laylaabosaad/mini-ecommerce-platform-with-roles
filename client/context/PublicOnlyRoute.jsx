import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function PublicOnlyRoute({ children }) {
  const { authenticated, loading } = useContext(UserContext);

  if (loading) return null;

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicOnlyRoute;
