import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import type { LoginData, AuthResponse } from "../types/auth.types";

const Login = () => {
  const navigate = useNavigate();
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

      alert(res.data.message);

      // save token
      localStorage.setItem("token", res.data.token);

      // optional: save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setForm({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login Failed");
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

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;