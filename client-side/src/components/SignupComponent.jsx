import React from "react";
import '../index.css'; // Global styles if needed

const SignupForm = ({ form, onChange, onSubmit, error }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in"
        >
            <h2 className="text-3xl font-bold text-center mb-6">Create Account 👤</h2>

            {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block mb-1 font-medium">
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                />
            </div>

            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition duration-300 font-semibold shadow-md"
            >
                Sign Up
            </button>

            <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                    href="/login"
                    className="text-blue-500 hover:underline dark:text-blue-400"
                >
                    Log in
                </a>
            </p>
        </form>
    );
};

export default SignupForm;
