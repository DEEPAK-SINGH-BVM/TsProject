import {
  Children,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { persistor } from "../store";
interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  signup: (token: string, role: string) => void;
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

  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const goTo = (path: string, replace?: boolean) => {
    navigate(path, { replace });
  };

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setRole(role);
  };

  const signup = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    persistor.purge();

    setToken(null);
    setRole(null);

    toast.success("Logout Succeessfull");
    // navigate("/login", { replace: true });
    goTo("/login", true);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, signup, logout, goTo }}>
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
