import React, { useState } from "react"
import { SignupData } from "../types/auth.types"
import { useNavigate } from "react-router-dom";
import api from "../api/axios"

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<SignupData>({
        name: "",
        email: "",
        password: "",
        role: "user"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/signup", form)
            alert(res.data.message)
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setForm({
                name: "",
                email: "",
                password: "",
                role: "user",
            })
            navigate("/dashboard");
        } catch (error: any) {
            alert(error.response?.data?.message || "signup Failed")
        }
    }
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="name"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <br /><br />

                <button type="submit">Signup</button>
            </form>
        </div>
    )
}
export default Signup