import React from 'react';

const RoundResult = ({ result }) => (
  <div className="round-result">
    <h2>Round Result: {result.winner === "Tie" ? "Tie" : `${result.winner} wins!`}</h2>
    <p>Compared Stat: {result.stat.replace(/([A-Z])/g, ' $1').trim()}</p>
    <div className="player-results">
      <div>
        <p><span>{result.player1.name}:</span> {result.player1.cardName}</p>
        <p>{result.stat}: {result.player1.value}</p>
      </div>
      <div>
        <p><span>{result.player2.name}:</span> {result.player2.cardName}</p>
        <p>{result.stat}: {result.player2.value}</p>
      </div>
    </div>
  </div>
);

export default RoundResult;