import axios from 'axios';
import React, { useState } from 'react';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');  // New state for success messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setSuccess(''); // Clear previous success message

        try {
            const response = await axios.post('http://localhost:8000/signup', {
                username,
                password
            });
            if (response.data.message) {
                setSuccess(response.data.message); // Set success message on successful sign up
            }
        } catch (err) {
            // Display the error message returned from the server if available
            setError(err.response?.data?.detail || "Failed to sign up. Please try again.");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required // Ensure this field is filled
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required // Ensure this field is filled
                />
                <button type="submit">Sign Up</button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Success message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
        </div>
    );
}

export default SignUp;
