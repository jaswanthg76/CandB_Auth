import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import CowsAndBullsGame from './game';
import './Welcome.css'; // Import the CSS file

function Welcome() {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

    const handleLeaderboardClick = () => {
        navigate('/leaderboard');
    };

    const handleLogout = () => {
        // Handle logout logic (e.g., clear user session, redirect, etc.)
        console.log("Logged out");
        // You can navigate to the login page or perform any other action
        navigate('/login');
    };

    return (
        <div>
            {/* Your game component */}
            <CowsAndBullsGame />

            {/* Leaderboard Button */}
            <button
                className= "button leaderboard-button"
                onClick={handleLeaderboardClick}
            >
                View Leaderboard
            </button>
            <button
                className="button stats-button"
                onClick={() => navigate("/user_stats")}
            >
                Stats
            </button>

            {/* Circular Icon for User */}
            <div className="user-icon" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Welcome;