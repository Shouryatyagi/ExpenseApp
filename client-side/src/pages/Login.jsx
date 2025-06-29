import React, { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginComponent";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/expense-app/login", form);

            // Handle successful login (e.g. save token, redirect)
            console.log("Login success:", response.data);
            setError("");

            // Example: store token in localStorage and redirect
            localStorage.setItem("token", response.data.token);
            window.location.href = "/dashboard"; // or use navigate from react-router

        } catch (err) {
            // Handle error response
            console.error("Login failed:", err);
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <LoginForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                error={error}
            />
        </div>
    );
};

export default Login;
