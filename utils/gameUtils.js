export const shuffleDeck = (deck) => {
    let shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  };
  
  export const compareStat = (stat, card1, card2, player1Name, player2Name) => {
    let player1Value = card1[stat];
    let player2Value = card2[stat];
  
    if (stat === 'economy') {
      player1Value = player1Value === 0 ? Infinity : player1Value;
      player2Value = player2Value === 0 ? Infinity : player2Value;
    } else {
      player1Value = player1Value === 0 ? -Infinity : player1Value;
      player2Value = player2Value === 0 ? -Infinity : player2Value;
    }
  
    let winner;
    if (stat === 'economy') {
      winner = player1Value < player2Value ? player1Name : player1Value > player2Value ? player2Name : "Tie";
    } else {
      winner = player1Value > player2Value ? player1Name : player1Value < player2Value ? player2Name : "Tie";
    }
  
    return {
      winner,
      stat,
      player1: {
        name: player1Name,
        cardName: card1.name,
        value: player1Value
      },
      player2: {
        name: player2Name,
        cardName: card2.name,
        value: player2Value
      }
    };
  };