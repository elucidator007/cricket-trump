import React from 'react';

const PlayerCard = ({ playerName, deck, isActive, isFlipped, setIsFlipped }) => (
  <div className={`player-card ${isActive ? 'active' : ''}`}>
    <h2>{playerName}&apos;s Card</h2>
    {deck.length > 0 && (isActive || isFlipped) ? (
      <div className="card-content">
        <p className="card-name">{deck[0].name}</p>
        {Object.entries(deck[0]).map(([key, value]) => (
          key !== 'name' && key !== 'photo' && (
            <div key={key} className="card-stat">
              <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span>{value}</span>
            </div>
          )
        ))}
      </div>
    ) : (
      <div className="card-back">
        <p>Card Face Down</p>
      </div>
    )}
    {!isActive && (
      <button onClick={() => setIsFlipped(!isFlipped)} className="flip-button">
        {isFlipped ? "Flip Down" : "Flip Up"}
      </button>
    )}
  </div>
);

export default PlayerCard;