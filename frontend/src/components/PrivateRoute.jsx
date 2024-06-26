import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinning from "./Spinning";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinning />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
