import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import RoundResult from './RoundResult';
import { compareStat } from '@/utils/gameUtils';

const GamePlay = ({ player1Name, player2Name, player1Deck, player2Deck, setPlayer1Deck, setPlayer2Deck }) => {
  const [roundWinner, setRoundWinner] = useState(null);
  const [currentStat, setCurrentStat] = useState("");
  const [activePlayer, setActivePlayer] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [roundResult, setRoundResult] = useState(null);

  const stats = ["runs", "average", "strikeRate", "centuries", "halfCenturies", "wickets", "economy", "fiveWicketHauls"];

  const handleStatComparison = (stat) => {
    if (player1Deck.length === 0 || player2Deck.length === 0) return;

    const result = compareStat(stat, player1Deck[0], player2Deck[0], player1Name, player2Name);
    setRoundResult(result);
    setRoundWinner(result.winner);
    setCurrentStat(stat);

    if (result.winner === player1Name) {
      setPlayer1Deck(prevDeck => [...prevDeck.slice(1), ...prevDeck.slice(0, 1), player2Deck[0]]);
      setPlayer2Deck(prevDeck => prevDeck.slice(1));
      setActivePlayer(1);
    } else if (result.winner === player2Name) {
      setPlayer2Deck(prevDeck => [...prevDeck.slice(1), ...prevDeck.slice(0, 1), player1Deck[0]]);
      setPlayer1Deck(prevDeck => prevDeck.slice(1));
      setActivePlayer(2);
    } else {
      setActivePlayer(activePlayer === 1 ? 2 : 1);
    }
    setIsFlipped(false);
  };

  return (
    <div className="game-play">
      <div className="player-cards">
        <PlayerCard playerName={player1Name} deck={player1Deck} isActive={activePlayer === 1} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
        <PlayerCard playerName={player2Name} deck={player2Deck} isActive={activePlayer === 2} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
      </div>

      <div className="stat-selection">
        <h2 className="turn-indicator">{`${activePlayer === 1 ? player1Name : player2Name}'s Turn - Select a Stat to Compare:`}</h2>
        <div className="stat-buttons">
          {stats.map((stat) => (
            <button key={stat} onClick={() => handleStatComparison(stat)} className="stat-button">
              {stat.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
      </div>

      {roundResult && <RoundResult result={roundResult} />}

      <div className="deck-sizes">
        <p>{player1Name}&apos;s Deck Size: {player1Deck.length}</p>
        <p>{player2Name}&apos;s Deck Size: {player2Deck.length}</p>
      </div>

      {(player1Deck.length === 0 || player2Deck.length === 0) && (
        <div className="game-over">
          <h2>{player1Deck.length === 0 ? player2Name : player1Name} Wins the Game!</h2>
        </div>
      )}
    </div>
  );
};

export default GamePlay;