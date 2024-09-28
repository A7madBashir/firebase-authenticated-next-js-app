"use client";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "firebase/auth";
import { LoginRequest } from "../models/request/login";
import { handleLoginUser } from "../modules/login/logic/handler";
import { AuthUserState } from "../models/DTO/authState";
import { isEmpty } from "../utils/isEmpty";
import { SignUpRequest } from "../models/request/signup";
import { handleSignUpUser } from "../modules/signup/logic/handler";
import useLocalStorage from "../hooks/useLocalStorage";
import Loading from "../app/loading";

interface AuthContextProvider {
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
  user: User | null;
  errorMessage: string;
  logout: () => void;
  login:
    | ((user: LoginRequest) => Promise<AuthUserState | undefined>)
    | (() => void);
  signUp:
    | ((user: SignUpRequest) => Promise<AuthUserState | undefined>)
    | (() => void);
}
const initAuthProvider: AuthContextProvider = {
  login: () => {},
  signUp: () => {},
  logout: () => {},
  token: "",
  errorMessage: "",
  user: null,
  isAuthenticated: false,
  loading: false,
};
const AuthContext = createContext<AuthContextProvider>(initAuthProvider);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage({
    key: "firebase-token",
    value: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [delayEnd, setDelayEnd] = useState(false);
  const logout = () => {
    setUser(null);
    setToken("");
    setIsAuth(false);
  };

  async function login(user: LoginRequest): Promise<AuthUserState | undefined> {
    setIsLoading(true);
    let res = await handleLoginUser(user);

    if (!isEmpty(res?.token)) {
      setIsAuth(true);
      setToken(res!.token);
      res?.user != null && setUser(res!.user);
    } else {
      setErrorMessage("Failed to log in please check your credentials");
    }

    setIsLoading(false);

    return res;
  }

  async function signUp(
    user: SignUpRequest
  ): Promise<AuthUserState | undefined> {
    setIsLoading(true);
    let res = await handleSignUpUser(user);

    if (!isEmpty(res?.token)) {
      setIsAuth(true);
      setToken(res!.token);
      res?.user != null && setUser(res?.user);
    } else {
      setErrorMessage("Failed to sign up please check your credentials");
    }

    setIsLoading(false);

    return res;
  }

  useEffect(() => {
    if (!isEmpty(token)) setIsAuth(true);
    const timeoutId = setTimeout(() => {
      setDelayEnd(true);
    }, 1200);
    return () => clearTimeout(timeoutId);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        errorMessage,
        logout,
        isAuthenticated: isAuth,
        loading: isLoading,
        signUp,
      }}
    >
      {delayEnd ? children : <Loading />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
