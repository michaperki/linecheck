// ImageDisplay.js
import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ firstFrameUrl, selectedSquares, onSquareClick }) => {
  const numRows = 30;
  const numCols = 30;

  const handleSquareClick = (row, col) => {
    const squareIndex = row * numCols + col;
    onSquareClick(squareIndex);
  };

  return (
    <div className="image-display">
      <div className="grid-container">
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: numCols }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`grid-square ${selectedSquares.includes(
                  rowIndex * numCols + colIndex
                ) ? 'selected' : ''}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <img
        src={firstFrameUrl}
        alt="First Frame"
        className="img"
      />
    </div>
  );
};

export default ImageDisplay;