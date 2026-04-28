import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SignupAction, SignupData } from "../../store/feature/auth";
import { useAppDispatch } from "../../hook/useAuth";

const Signup = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [focused , setFocused] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(SignupAction(form, auth));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create your account</h2>
          <p style={styles.subtitle}>Join our e-commerce platform</p>
        </div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              style={{
                ...styles.input,
                ...(focused === "name" ? styles.inputFocus : {}),
              }}
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={{
                ...styles.input,
                ...(focused === "email" ? styles.inputFocus : {}),
              }}
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
              required
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
          </div>
          <div style={styles.field}>
            <label htmlFor="role" style={styles.label}>
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              style={styles.button}
            >
              Sign Up
            </button>
          </div>
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Already have an account?{" "}
              <Link to="/login" style={styles.link}>
                Sign in
              </Link>
            </p>
          </div>
        </form>
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
    textAlign: "center",
    marginBottom: "28px",
  },
  title: {
    margin: 0,
    fontSize: "1.75rem",
    lineHeight: 1.2,
    color: "#1f2937",
    fontWeight: 600,
  },
  subtitle: {
    marginTop: "10px",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
  form: {
    marginTop: "32px",
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
    fontWeight: 500,
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
  select: {
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
  footer: {
    marginTop: "20px",
    textAlign: "center",
  },
  footerText: {
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  link: {
    color: "#111827",
    textDecoration: "none",
    fontWeight: 600,
  },
} as const;

export default Signup;
