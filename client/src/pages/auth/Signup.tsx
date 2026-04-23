import React, { useDebugValue, useState } from "react";
import { SignupData } from "../../types/auth.types";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { SignupAction } from "./redux";

const Signup = () => {
  // const navigate = useNavigate();
  const { login, goTo } = useAuth();
  const dispatch = useDispatch()
  const [form, setForm] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const res = await api.post("/auth/signup", form);
  //     toast.success(res.data.message);
  //     // login(res.data.token, res.data.user.role);
  //     dispatch(SignupAction(form));
  //     // localStorage.setItem("token", res.data.token);
  //     // localStorage.setItem("role", res.data.user.role);
  //     const role = res.data.user.role;

  //     if (role === "seller") {
  //       goTo("/seller/dashboard", true);
  //       // navigate("/seller/dashboard");
  //     } else {
  //       // navigate("/home");
  //       goTo("/home", true);
  //     }

  //     setForm({
  //       name: "",
  //       email: "",
  //       password: "",
  //       role: "buyer",
  //     });
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message || "signup Failed");
  //   }
  // };
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    SignupAction(form, auth)(dispatch);
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
        <Link to="/login">Already Exists ?</Link>
      </form>
    </div>
  );
};
export default Signup;
