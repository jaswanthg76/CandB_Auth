import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styles
import cowImage from './images/cow.png'; // Import cow image
import bullImage from './images/bull.png'; // Import bull image
import UpdateStats from './UpdateStats';

const generateNumber = () => {
  let digits = [];

  digits.push(Math.floor(Math.random() * 9) + 1); // First digit non-zero

  while (digits.length < 3) {
    let newDigit = Math.floor(Math.random() * 10);
    if (!digits.includes(newDigit)) {
      digits.push(newDigit);
    }
  }

  return digits.join('');
};

const calculateCowsAndBulls = (guess, secretNumber) => {
  let cows = 0;
  let bulls = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secretNumber[i]) {
      bulls++;
    } else if (secretNumber.includes(guess[i])) {
      cows++;
    }
  }

  return { cows, bulls };
};

const CowsAndBullsGame = () => {
  const [secretNumber, setSecretNumber] = useState(generateNumber);
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [message, setMessage] = useState('');
  
  const guessCount=5-attemptsLeft;
  const username = localStorage.getItem('username'); 


  useEffect(() => {
    console.log("Secret Number: ", secretNumber); // For testing/debugging
  }, [secretNumber]);

  const handleGuess = () => {
    if (guess.length !== 3 || new Set(guess).size !== 3 || guess[0] === '0') {
      setMessage('Invalid guess! Ensure it is a 3-digit number, no repeated digits, and first digit cannot be 0.');
      return;
    }

    const { cows, bulls } = calculateCowsAndBulls(guess, secretNumber);
    const newHistory = [...history, { guess, cows, bulls }];

    setHistory(newHistory);
    setAttemptsLeft(attemptsLeft - 1);

    if (bulls === 3) {
      setMessage(`Congratulations! You guessed the number ${secretNumber}.`);
    } else if (attemptsLeft - 1 === 0) {
      setMessage(`You lose! The correct number was ${secretNumber}.`);
    } else {
      setMessage(`${bulls} Bulls, ${cows} Cows`);
    }

    setGuess(''); // Clear input
  };

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const resetGame = () => {
    setSecretNumber(generateNumber());
    setGuess('');
    setHistory([]);
    setAttemptsLeft(5);
    setMessage('');
  };

  return (
    <div className="game-container">
      <h1 className="title">Cows and Bulls Game</h1>
      <p className="description">Guess the 3-digit number (no repeated digits, first digit can't be 0).</p>

      <div className="input-container">
        <input
          className="input-box"
          type="text"
          value={guess}
          onChange={handleInputChange}
          maxLength="3"
          placeholder="Enter your guess"
        />
        <button className="guess-button" onClick={handleGuess} disabled={attemptsLeft === 0 || message.includes('Congratulations')}>Submit Guess</button>
      </div>

      <p className="attempts">Attempts left: {attemptsLeft}</p>
      <p className="message">{message}</p>

      <h3 className="history-title">Guess History</h3>
      <ul className="guess-history">
        {history.map((entry, index) => (
          <li key={index}>
            Guess {index + 1}: {entry.guess} —
            <span className="cow-span">
              {entry.cows} <img src={cowImage} alt="Cow" className="icon" />
            </span>
            <span className="bull-span">
              {entry.bulls} <img src={bullImage} alt="Bull" className="icon" />
            </span>
          </li>
        ))}
      </ul>

      <div className="button-container">
        {(message.includes('lose') || message.includes('Congratulations')) && (<>
          <UpdateStats username={username} guesses={guessCount}> </UpdateStats>
          <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </>
           )}
      </div>
    </div>
  );
};

export default CowsAndBullsGame;
