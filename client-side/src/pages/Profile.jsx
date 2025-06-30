import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [placeholders, setPlaceholders] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8080/expense-app/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { name, email } = res.data;

                setPlaceholders({ name, email });
            } catch (err) {
                console.error(err);
                setError("Failed to load user data.");
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8080/expense-app/user", {
                name: form.name || placeholders.name,
                password: form.password,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            setError("Failed to update profile.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={placeholders.name}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value=""
                        placeholder={placeholders.email}
                        disabled
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder={placeholders.password}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition duration-300 font-semibold"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
