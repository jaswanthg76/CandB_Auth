

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';  // Import the CSS file

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // Fetch the leaderboard data from the backend
        axios.get('http://localhost:8000/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-heading">Leaderboard</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr key={user.username}>
                            <td className="rank-column">{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.wins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="leaderboard-btn" onClick={() => window.location.href = '/welcome'}>
                Back to Game
            </button>
        </div>
    );
};

export default Leaderboard;