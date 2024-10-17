import React, { useEffect, useState } from 'react';
import './UserStats.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const UserStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem('username');
    const fetchUserStats = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user_stats?username=${username}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-stats-container">
      <button className="stats-button" onClick={() => navigate("/welcome")}> back </button>
      <h2 className="user-stats-title">User Stats</h2>
      <p className="stats-item"> <span className="stats-value">User: {stats.username}</span></p>
      {/* <p className="stats-item">Games Played: <span className="stats-value">{stats.games_played}</span></p> */}
      <p className="stats-item"> won: <span className="stats-value">{stats.wins}</span> lost: <span className="stats-value">{stats.losses}</span></p>
      {/* <p className="stats-item"> lost: <span className="stats-value">{stats.losses}</span></p> */}
      <p className="stats-item">Average Guesses: <span className="stats-value">{stats.avg_guesses.toFixed(2)}</span></p>
      <h3 className="guess-history-title">Guess History</h3>
      <ul className="guess-history-list">
        {stats.guess_history.map((guess, index) => (
          <li key={index} className="guess-history-item">Game {index + 1}: <span className="guess-value">{guess}</span> guesses</li>
        ))}
      </ul>
    </div>
  );
};

export default UserStats;
