import React from 'react';

const GameSetup = ({ player1Name, player2Name, setPlayer1Name, setPlayer2Name, startGame }) => {
  return (
    <div className="game-setup">
      <input
        type="text"
        placeholder="Player 1 Name"
        value={player1Name}
        onChange={(e) => setPlayer1Name(e.target.value)}
        className="player-input"
      />
      <input
        type="text"
        placeholder="Player 2 Name"
        value={player2Name}
        onChange={(e) => setPlayer2Name(e.target.value)}
        className="player-input"
      />
      <button onClick={startGame} className="start-button">
        Start Game
      </button>
    </div>
  );
};

export default GameSetup;