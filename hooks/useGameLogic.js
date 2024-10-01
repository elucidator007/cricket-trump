import { useState, useCallback } from 'react';
import { shuffleDeck, compareStat } from '@/utils/gameUtils';
import { DATA } from "@/utils/data";

export const useGameLogic = (player1Name, player2Name) => {
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [activePlayer, setActivePlayer] = useState(1);
  const [roundResult, setRoundResult] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const startGame = useCallback(() => {
    if (player1Name && player2Name) {
      const shuffledDeck = shuffleDeck(DATA);
      setPlayer1Deck(shuffledDeck.slice(0, shuffledDeck.length / 2));
      setPlayer2Deck(shuffledDeck.slice(shuffledDeck.length / 2));
    }
  }, [player1Name, player2Name]);

  const handleCompareStat = useCallback((stat) => {
    if (player1Deck.length === 0 || player2Deck.length === 0) return;

    const result = compareStat(player1Deck[0], player2Deck[0], stat, player1Name, player2Name);
    setRoundResult(result);

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
  }, [player1Deck, player2Deck, player1Name, player2Name, activePlayer]);

  const handleFlipCard = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  return {
    player1Deck,
    player2Deck,
    activePlayer,
    roundResult,
    isFlipped,
    handleCompareStat,
    handleFlipCard,
    startGame
  };
};