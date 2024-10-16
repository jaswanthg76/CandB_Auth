import React from 'react';
import CowsAndBullsGame from './game';
import { useNavigate } from 'react-router-dom';
function Welcome() {

   const navigate = useNavigate();
    return (
        <div>
            <CowsAndBullsGame></CowsAndBullsGame>
            <button className="stats-button" onClick={() => navigate("/user_stats")}> Stats </button>
        </div>
    );
}

export default Welcome;
