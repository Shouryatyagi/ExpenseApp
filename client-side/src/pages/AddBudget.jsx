import React, { useEffect, useState } from "react";
import axios from "axios";

const AddBudget = () => {
    const [form, setForm] = useState({
        category: "",
        amount: "",
        month: "",
        year: "",
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8080/expense-app/budget-categories", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setCategories(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/expense-app/budget", form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Budget added successfully!");
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to add budget.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Add Budget</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-500 mb-4">{message}</p>}

                <select name="category" value={form.category} onChange={handleChange} required className="input mb-4">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" required className="input mb-4" />
                <input name="month" type="number" value={form.month} onChange={handleChange} placeholder="Month (1-12)" required className="input mb-4" />
                <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Year (e.g. 2025)" required className="input mb-4" />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:opacity-90">
                    Add Budget
                </button>
            </form>
        </div>
    );
};

export default AddBudget;
