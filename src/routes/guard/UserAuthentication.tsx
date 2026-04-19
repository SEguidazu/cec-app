import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth";

interface UserAuthenticationProps {
  children?: React.ReactNode;
}

const UserAuthentication: React.FC<UserAuthenticationProps> = ({
  children,
}) => {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  return user && accessToken ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserAuthentication;
