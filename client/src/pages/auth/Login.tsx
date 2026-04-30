
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginAction } from "../../store/feature/auth";
import { useAppDispatch } from "../../hook/useAuth";
import { useState } from "react";
import type { LoginData } from "../../types/auth.types";


const Login = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              required
            />
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
              required
            />
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
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
    borderRadius: "28px",
    padding: "32px",
  },
  header: {
    marginBottom: "28px",
  },
  title: {
    margin: 0,
    fontSize: "1.75rem",
    lineHeight: 1.2,
    color: "#1f2937",
  },
  subtitle: {
    marginTop: "10px",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
  field: {
    width: "100%",
    marginBottom: "18px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "0.95rem",
    color: "#4b5563",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#111827",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  } as const,
  inputFocus: {
    borderColor: "#9ca3af",
    boxShadow: "0 0 0 4px rgba(148, 163, 184, 0.12)",
  },
    button: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "16px",
    border: "none",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  } as const,
  buttonHover: {
    backgroundColor: "#0f172a",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  link: {
    color: "#111827",
    textDecoration: "none",
    fontWeight: 600,
  },
} as const;
export default Login;
