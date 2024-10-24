import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth";

const UserAuthentication = () => {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  return user && accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default UserAuthentication;
