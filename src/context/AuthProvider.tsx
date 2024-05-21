import { ReactNode, createContext, useState } from "react";
import { User } from "@/types";

type AuthContextType = {
  auth: AuthContextState;
  setAuth: (data: AuthContextState) => void;
};

type AuthContextState = {
  user: User | null;
  accessToken: string | null;
};

const initialState: AuthContextState = {
  user: null,
  accessToken: null,
};

const authContextDefault = {
  auth: initialState,
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefault);

interface AuthInterface {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthInterface) => {
  const [auth, setAuth] = useState<AuthContextState>(initialState);

  const handleSetAuth = (data: AuthContextState) =>
    setAuth({ ...auth, ...data });

  return (
    <AuthContext.Provider value={{ auth, setAuth: handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
