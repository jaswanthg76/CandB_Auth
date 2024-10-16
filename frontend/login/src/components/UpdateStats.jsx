import React, { useState } from 'react';

const UpdateStats = ({ username }) => {
  const [guesses, setGuesses] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, guesses: parseInt(guesses) };

    try {
      const response = await fetch('http://127.0.0.1:8000/game_stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setMessage(`Stats updated! Average guesses: ${data.avg_guesses}`);
    } catch (err) {
      setMessage('Error updating stats.');
    }
  };

  return (
    <div>
      <h2>Update Stats</h2>
     
       <p>{message}</p>
    </div>
  );
};

export default UpdateStats;
