import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../store/feature/auth";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(sendOtp(email) as any);
    navigate("/reset-password", { state: email });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Forgot Password</h1>
          <p style={styles.subtitle}>
            Enter your email and we’ll send you an OTP to reset your password.
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Send OTP
          </button>
        </form>

        {/* Back to login */}
        <div style={styles.footer}>
          Remember your password?{" "}
          <Link to="/login" style={styles.link}>
            Go back to login
          </Link>
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
    backgroundColor: "#f9fafb",
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
    color: "#1f2937",
  },
  subtitle: {
    marginTop: "10px",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
  field: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#4b5563",
    fontSize: "0.95rem",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
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
    marginTop: "10px",
  } as const,
  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  link: {
    color: "#111827",
    fontWeight: 600,
    textDecoration: "none",
  },
} as const;
export default ForgotPassword;
