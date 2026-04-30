import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../store/feature/auth";

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    otp: "",
    new_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(resetPassword({
      otp: form.otp,
      new_password: form.new_password
    },navigate as any));
  };
   return (
     <div style={styles.page}>
       <div style={styles.card}>
         <div style={styles.header}>
           <h1 style={styles.title}>Reset Password</h1>
           <p style={styles.subtitle}>Enter OTP and set your new password</p>
         </div>

         <form onSubmit={handleSubmit}>
           <div style={styles.field}>
             <label style={styles.label}>OTP</label>
             <input
               type="text"
               value={form.otp}
               placeholder="Enter OTP"
               onChange={(e) => setForm({ ...form, otp: e.target.value })}
               style={styles.input}
               required
             />
           </div>

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

           <button type="submit" style={styles.button}>
             Reset Password
           </button>
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
    marginBottom: "24px",
  },
  title: {
    margin: 0,
    fontSize: "1.75rem",
    color: "#1f2937",
  },
  subtitle: {
    marginTop: "8px",
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  field: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    color: "#4b5563",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
  } as const,
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "10px",
  } as const,
  footer: {
    marginTop: "18px",
    textAlign: "center" as const,
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  link: {
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default ResetPassword;
