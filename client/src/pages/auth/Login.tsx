import { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import type { LoginData, AuthResponse } from "../../types/auth.types";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  // const navigate = useNavigate();
  const { login,goTo } = useAuth();
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<AuthResponse>("/auth/login", form);
      toast.success(res.data.message);
      login(res.data.token, res.data.user.role);

      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("role", res.data.user.role);
      const role = res.data.user.role;

      if (role === "seller") {
        goTo("/seller/dashboard",true)
        // navigate("/seller/dashboard");
      } else {
        // navigate("/home");
        goTo("/home", true);
      }
      setForm({
        email: "",
        password: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Login</button>
        <Link to="/signup">Create new Account</Link>
      </form>
    </div>
  );
};

export default Login;
