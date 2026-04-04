import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();

  // 🔥 prevent redirect before checking auth
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;