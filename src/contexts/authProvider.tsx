import { useContext, createContext, useState, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { User } from "firebase/auth";
import { LoginRequest } from "../models/request/login";
import { handleLoginUser } from "../modules/login/logic/handler";
import { AuthUserState } from "../models/DTO/authState";

interface AuthContextProvider {
  token?: string;
  user?: User | null;
  logout?: () => void;
  login?: (user: LoginRequest) => Promise<AuthUserState | undefined>;
}

const AuthContext = createContext<AuthContextProvider>({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage({
    key: "firebase-token",
    value: "",
  });

  const logout = () => {
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login: handleLoginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
