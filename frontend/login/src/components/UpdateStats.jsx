import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is imported

const UpdateStats = ({ username, guesses }) => {
  console.log(username);
  console.log(guesses);
  const [message, setMessage] = useState('');

  // Function to handle the API call
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/game_stats', {
        username,
        guesses
      });
      
      if (response.data.message) {
        setMessage(`Stats updated! Average guesses: ${response.data.avg_guesses}`);
      }
    } catch (err) {
      setMessage('Error updating stats.');
    }
  };

  // Call handleSubmit when the component mounts
  useEffect(() => {
    handleSubmit();
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default UpdateStats;
