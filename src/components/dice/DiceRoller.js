import React, { useState } from 'react';
import './DiceRoller.css';

export const DiceRoller = () => {
  const [selectedDice, setSelectedDice] = useState([]);
  const [rollResults, setRollResults] = useState([]);
  const [rollTotal, setRollTotal] = useState(0);

  const handleDiceSelection = (dice) => {
    setSelectedDice([...selectedDice, dice]);
  };

  const handleRemoveDice = (dice) => {
    setSelectedDice(selectedDice.filter((selected) => selected !== dice));
  };

  const handleRoll = () => {
    let total = 0;
    const results = selectedDice.map((dice) => {
      const min = 1;
      let max;

      switch (dice) {
        case 'd4':
          max = 4;
          break;
        case 'd6':
          max = 6;
          break;
        case 'd8':
          max = 8;
          break;
        case 'd10':
          max = 10;
          break;
        case 'd12':
          max = 12;
          break;
        case 'd20':
          max = 20;
          break;
        case 'd100':
          max = 100;
          break;
        default:
          max = 0;
      }

      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      total += result;
      return `${dice}: ${result}`;
    });

    results.push(`Roll Total: ${total}`);

    setRollResults(results);
    setRollTotal(total);
  };

  const handleClearSelection = () => {
    setSelectedDice([]);
    setRollResults([]);
    setRollTotal(0);
  };

  return (
    <div className="dice-roller">
      <div className="dice-selection">
        <button
          className={`dice-button ${selectedDice.includes('d4') ? 'selected' : ''}`}
          onClick={() => handleDiceSelection('d4')}
        >
          d4
        </button>
        <button
          className={`dice-button ${selectedDice.includes('d6') ? 'selected' : ''}`}
          onClick={() => handleDiceSelection('d6')}
        >
          d6
        </button>
        <button
          className={`dice-button ${selectedDice.includes('d8') ? 'selected' : ''}`}
          onClick={() => handleDiceSelection('d8')}
        >
          d8
        </button>
        <button
          className={`dice-button ${selectedDice.includes('d10') ? 'selected' : ''}`}
          onClick={() => handleDiceSelection('d10')}
        >
          d10
        </button>
        <button
          className={`dice-button ${selectedDice.includes('d12') ? 'selected' : ''}`}
          onClick={() => handleDiceSelection('d12')}
        >
          d12
        </button>
        <button
          className={`dice-button ${selectedDice.includes('d20') ? 'selected' : ''}`}
          onClick={() => handleDiceSelection('d20')}
        >
          d20
        </button>
        <button
          className={`dice-button ${selectedDice.includes('d100') ? 'selected' : ''}`}
          onClick={() => handleDiceSelection('d100')}
        >
          d100
        </button>
      </div>

      <div className="roll-animation-box">
  {selectedDice.map((dice) => (
    <div key={dice} className="dice-animation" onClick={() => handleRemoveDice(dice)}>
      {dice}
    </div>
  ))}
</div>


      <button className="roll-button" onClick={handleRoll}>
        Roll
      </button>

      <button className="clear-button" onClick={handleClearSelection}>
        Clear
      </button>

      <div className="roll-results">
        {rollResults.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
};
