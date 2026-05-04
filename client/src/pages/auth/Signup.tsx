import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SignupAction, SignupData } from "../../store/feature/auth";
import { useAppDispatch } from "../../hook/useAuth";
import { authStyles as styles } from "../../styles/auth.styles";

const Signup = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [focused, setFocused] = useState<string | null>(null);
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
            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </div>
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Already have an account?{" "}
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
