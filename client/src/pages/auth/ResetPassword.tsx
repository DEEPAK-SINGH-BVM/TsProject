import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../store/feature/auth";
import { toast } from "react-toastify";
import { authStyles as styles } from "../../styles/auth.styles";
const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      return toast.warn("Password not Match");
    }
    await dispatch(
      resetPassword(
        {
          new_password: form.new_password,
        },
        navigate as any,
      ),
    );
  };
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.subtitle}>Enter OTP and set your new password</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* <div style={styles.field}>
            <label style={styles.label}>OTP</label>
            <input
              type="text"
              value={form.otp}
              placeholder="Enter OTP"
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              style={styles.input}
              required
            />
          </div> */}

          <div style={styles.field}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              value={form.new_password}
              placeholder="Enter New Password"
              onChange={(e) =>
                setForm({ ...form, new_password: e.target.value })
              }
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Conform Password</label>
            <input
              type="password"
              value={form.confirm_password}
              placeholder="Enter Conform Password"
              onChange={(e) =>
                setForm({ ...form, confirm_password: e.target.value })
              }
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}; 

export default ResetPassword;
