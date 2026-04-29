import React, { useState } from "react";
import { SignupData } from "../store/feature/auth/action";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAppDispatch } from "../hook/useAuth";
import { SignupAction } from "../store/feature/auth";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const [form, setForm] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? (value as SignupData["role"]) : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(SignupAction(form, auth));
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <br />
        <br />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <br />
        <br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
export default Signup;
