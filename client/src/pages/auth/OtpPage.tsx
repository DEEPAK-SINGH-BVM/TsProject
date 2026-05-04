import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../../store/feature/auth";
import { toast } from "react-toastify";
import { authStyles as styles } from "../../styles/auth.styles";

const OtpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(verifyOtp({ otp }, navigate));
  };
  const handleResend = async () => {
    const email = localStorage.getItem("otpEmail");
    if (!email) {
      toast.error("Email Not Found !!"); 
      return
    }
    dispatch(sendOtp(email))
  };
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Verify OTP</h1>
          <p style={styles.subtitle}>Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>OTP</label>
            <input
              type="text"
              value={otp}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
              required
            />
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <button type="button" onClick={handleResend} style={styles.link}>
                Resend OTP
              </button>
            </div>
          </div>
          <button type="submit" style={styles.button}>
            Varify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
