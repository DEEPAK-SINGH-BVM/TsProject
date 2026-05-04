import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../store/feature/auth";
import { authStyles as styles } from "../../styles/auth.styles";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(sendOtp(email) as any);
    navigate("/verify-otp", { state: email });
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
export default ForgotPassword;
