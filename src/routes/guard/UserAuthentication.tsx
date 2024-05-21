import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const UserAuthentication = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.user && auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default UserAuthentication;
