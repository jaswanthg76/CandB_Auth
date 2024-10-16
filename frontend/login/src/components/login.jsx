// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file

function Login() {
    const [username, setUsernameState] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    localStorage.removeItem('token'); // Clear the token on component mount
    localStorage.removeItem('username');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:8000/login', { username, password });
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', username);
                navigate('/welcome');
            }
        } catch (error) {
            setError(error.response?.data?.detail || 'Something went wrong');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsernameState(e.target.value)}
                    placeholder="Username"
                    className="input-field"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input-field"
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
            <p className="signup-prompt">
                Don't have an account?
                <button onClick={() => navigate('/signup')} className="signup-button">
                    Sign Up
                </button>
            </p>
        </div>
    );
}

export default Login;
