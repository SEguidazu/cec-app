import { ReactNode, createContext, useState } from "react";
import { Member, User } from "@/types";

type AuthContextType = {
  auth: AuthContextState;
  setAuth: (data: AuthContextUpdate) => void;
  loggedOut: () => void;
};

type AuthContextState = {
  user: User | null;
  members: Array<Member>;
  accessToken: string | null;
};

type AuthContextUpdate = {
  user?: User | null;
  members?: Array<Member>;
  accessToken?: string | null;
};

const initialState: AuthContextState = {
  user: null,
  members: [],
  accessToken: null,
};

const authContextDefault = {
  auth: initialState,
  setAuth: () => {},
  loggedOut: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefault);

interface AuthInterface {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthInterface) => {
  const [auth, setAuth] = useState<AuthContextState>(initialState);

  const handleSetAuth = (data: AuthContextUpdate) =>
    setAuth({ ...auth, ...data });

  const handleLoggedOut = () => setAuth(initialState);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth: handleSetAuth, loggedOut: handleLoggedOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
