// RegionSelector.js
import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const RegionSelector = ({ firstFrameUrl, handleGridSelection }) => {
  const navigate = useNavigate();

  const { videoId } = useParams();

  const [selectedSquares, setSelectedSquares] = useState([]);

  const clearSelectedSquares = () => {
    setSelectedSquares([]);
  };

  const handleSquareClick = (squareIndex) => {
    if (selectedSquares.includes(squareIndex)) {
      setSelectedSquares(selectedSquares.filter(index => index !== squareIndex));
    } else {
      setSelectedSquares([...selectedSquares, squareIndex]);
    }
  };

  const handleSubmit = () => {
    if (selectedSquares.length > 0) {
      handleGridSelection(selectedSquares);
      navigate(`/data/${videoId}`);
    } else {
      alert('Please select at least one square.');
    }
  };

  return (
    <div className="region-selector">
      <h3>Select Regions</h3>
      <ImageDisplay
        firstFrameUrl={firstFrameUrl}
        selectedSquares={selectedSquares}
        onSquareClick={handleSquareClick}
      />
      <button
        className="clear-button"
        disabled={selectedSquares.length === 0}
        onClick={clearSelectedSquares}
      >
        Clear
      </button>
      <br />
      <button
        className="submit-button"
        disabled={selectedSquares.length === 0}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default RegionSelector;
