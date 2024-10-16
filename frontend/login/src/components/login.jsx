// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
                localStorage.setItem('username',username);
               
                navigate('/welcome');
            }
        } catch (error) {
            setError(error.response?.data?.detail || 'Something went wrong');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsernameState(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?
                <button onClick={() => navigate('/signup')} style={{ marginLeft: '5px' }}>
                    Sign Up
                </button>
            </p>
        </div>
    );
}

export default Login;
