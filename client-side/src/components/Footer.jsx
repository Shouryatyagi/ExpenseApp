import React from "react";
import '../index.css'
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-4 mt-auto">
            <div className="container mx-auto px-4 flex flex-col  justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} ExpenseApp. All rights reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;
