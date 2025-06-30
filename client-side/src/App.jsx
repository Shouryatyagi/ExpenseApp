import './index.css'
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from './components/Navbar';
import React, { useState, useEffect } from 'react';
export default function App() {
      const [username, setUsername] = useState('');

       useEffect(() => {
    // Example fetch from API
    const fetchUsername = async () => {
      try {
        const response = await fetch('/api/user'); // your real endpoint here
        const data = await response.json();
        setUsername(data.username); // assuming the response looks like { username: "JohnDoe" }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUsername();
  }, []);
  return (
    
      <>

          <div className="flex flex-col min-h-screen">
             <Navbar username={username} />
              <main className="flex-grow">
                 
              </main>
              <Routes>
                  <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
              </Routes>

              <Footer />
          </div>
      </>

  );
}
