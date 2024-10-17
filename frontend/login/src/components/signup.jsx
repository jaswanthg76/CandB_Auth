import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8000/signup', {
                username,
                password
            });
            if (response.data.message) {
                setSuccess(response.data.message);
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to sign up. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="signup-container">
            <h2 className="title">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="input-box"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input-box"
                    required
                />
                <button type="submit" className="guess-button">Sign Up</button>
            </form>
            <p className="signup-prompt">
                Already have an account?
                <button onClick={() => navigate('/login')} className="signup-button">
                    Log In
                </button>
            </p>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default SignUp;
