import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8080/expense-app/login', {
        email,
        password
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      const token = res.data.token;
      if (token) {
        localStorage.setItem('token', token);
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const signup = async (name, email, password) => {
  try {
    const res = await axios.post('http://localhost:8080/expense-app/signup', {
      name,
      email,
      password
    }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });

    // You can also store user info if your backend sends it
    const token = res.data.token;
    if (token) {
      localStorage.setItem('token', token);
      setUser(res.data.user); // optional if your backend includes it
    }

    return true; 
  } catch (err) {
    console.error('Signup error:', err);
    return false;
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
