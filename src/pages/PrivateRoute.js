import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAdmin, children }) => {
  useEffect(() => {
  }, [isAdmin])
  return isAdmin ? children : <Navigate to="/login" />;
};

export default PrivateRoute