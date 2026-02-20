import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("userId");
  const isActuallyAuthenticated =
    isAuthenticated && isAuthenticated !== "undefined";

  if (!isActuallyAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
