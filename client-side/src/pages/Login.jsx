import React, { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginComponent";
import { useEffect } from "react";
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
      const [infoMessage, setInfoMessage] = useState("");

    useEffect(() => {
        const message = localStorage.getItem("signupMessage");
        if (message) {
            setInfoMessage(message);
            localStorage.removeItem("signupMessage");
        }
    }, []);
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
            <div className="w-full max-w-md">
                {infoMessage && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center dark:bg-green-900 dark:text-green-200">
                        {infoMessage}
                    </div>
                )}
            <LoginForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                error={error}
            />
            </div>
        </div>
    );
};

export default Login;
