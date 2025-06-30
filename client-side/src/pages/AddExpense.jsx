import React, { useEffect, useState } from "react";
import axios from "axios";

const AddExpense = () => {
    const [form, setForm] = useState({
        amount: "",
        description: "",
        category: "",
        paymentMethod: "",
        date: "",
        location: "",
    });
    const [categories, setCategories] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const token = localStorage.getItem("token");

                const [catRes, payRes] = await Promise.all([
                    axios.get("http://localhost:8080/expense-app/categories", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:8080/expense-app/payment-methods", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setCategories(catRes.data);
                setPaymentMethods(payRes.data);
            } catch (err) {
                console.error("Dropdown load failed", err);
                setError("Failed to load dropdown data.");
            }
        };

        fetchDropdowns();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/expense-app/expense", form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Expense added successfully!");
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to add expense.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-xl"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Add Expense</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-500 mb-4">{message}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" required className="input" />
                    <input name="description" type="text" value={form.description} onChange={handleChange} placeholder="Description" required className="input" />

                    <select name="category" value={form.category} onChange={handleChange} required className="input">
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required className="input">
                        <option value="">Payment Method</option>
                        {paymentMethods.map((pm) => (
                            <option key={pm} value={pm}>{pm}</option>
                        ))}
                    </select>

                    <input name="date" type="date" value={form.date} onChange={handleChange} required className="input" />
                    <input name="location" type="text" value={form.location} onChange={handleChange} placeholder="Location (optional)" className="input" />
                </div>

                <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:opacity-90">
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddExpense;
