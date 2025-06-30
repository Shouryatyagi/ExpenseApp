import React, { useState } from "react";
import axios from "axios";
import SignupForm from "../components/SignupComponent"; // Make sure path is correct

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/expense-app/signup", {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            console.log("Signup success:", response.data);
            setError("");

            // Optionally store token or redirect
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("signupMessage", "Signup successful! Please sign in.");
            window.location.href = "/login";

        } catch (err) {
            console.error("Signup failed:", err);
            setError(
                err.response?.data?.message || "Signup failed. Please try again."
            );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <SignupForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                error={error}
            />
        </div>
    );
};

export default Signup;
