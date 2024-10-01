'use client'

import React, { useState } from 'react';
import GameSetup from './GameSetup';
import GamePlay from './GamePlay';
import { shuffleDeck } from '@/utils/gameUtils';
import { DATA } from '@/utility/data';

const TrumpCardGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);

  const startGame = () => {
    if (player1Name && player2Name) {
      const shuffledDeck = shuffleDeck(DATA);
      setPlayer1Deck(shuffledDeck.slice(0, shuffledDeck.length / 2));
      setPlayer2Deck(shuffledDeck.slice(shuffledDeck.length / 2));
      setGameState('playing');
    }
  };

  return (
    <div className="trump-card-game">
      <h1 className="game-title">Cricket Trump Card Game</h1>
      {gameState === 'setup' ? (
        <GameSetup
          player1Name={player1Name}
          player2Name={player2Name}
          setPlayer1Name={setPlayer1Name}
          setPlayer2Name={setPlayer2Name}
          startGame={startGame}
        />
      ) : (
        <GamePlay
          player1Name={player1Name}
          player2Name={player2Name}
          player1Deck={player1Deck}
          player2Deck={player2Deck}
          setPlayer1Deck={setPlayer1Deck}
          setPlayer2Deck={setPlayer2Deck}
        />
      )}
    </div>
  );
};

export default TrumpCardGame;