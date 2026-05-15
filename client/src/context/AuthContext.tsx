import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { persistor } from "../store";
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  signup: (token: string) => void;
  logout: () => void;
  goTo: (path: string, replace?: boolean) => void;
}
interface Props {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const goTo = (path: string, replace?: boolean) => {
    navigate(path, { replace });
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const signup = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    persistor.purge();

    setToken(null);
    toast.success("Logout Successfully");
    goTo("/login", true);
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout, goTo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
