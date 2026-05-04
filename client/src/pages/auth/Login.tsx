
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginAction } from "../../store/feature/auth";
import { useAppDispatch } from "../../hook/useAuth";
import { useState } from "react";
import type { LoginData } from "../../types/auth.types";
import { authStyles  as styles} from "../../styles/auth.styles";

const Login = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const [error, setError] = useState<Record<string, string>>({});

  const validation = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation()) return;
    dispatch(LoginAction(form, auth));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome back</h1>
          <p style={styles.subtitle}>
            Sign in to access your storefront, orders, and dashboard tools.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={{
                ...styles.input,
                ...(focused === "email" ? styles.inputFocus : {}),
              }}
            />
            <span style={{ color: "red" }}>{error.email}</span>
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={{
                ...styles.input,
                ...(focused === "password" ? styles.inputFocus : {}),
              }}
            />
            <span style={{ color: "red" }}>{error.password}</span>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
            }}
          >
            Login
          </button>
        </form>

        <div style={styles.footer}>
          New here?{" "}
          <Link to="/signup" style={styles.link}>
            Create an account
          </Link>
          <div style={{ marginTop: "10px" }}>
            <Link to="/forgot-password" style={styles.link}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
