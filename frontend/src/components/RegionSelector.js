// RegionSelector.js
import React, { useState } from "react";
import ImageDisplay from "./ImageDisplay";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const RegionSelector = ({ firstFrameUrl, handleGridSelection }) => {
  const navigate = useNavigate();

  const { videoId } = useParams();

  const [selectedSquaresStack, setSelectedSquaresStack] = useState([]);
  const [selectedSquaresOpponent, setSelectedSquaresOpponent] = useState([]);
  const [currentMode, setCurrentMode] = useState("Stack"); // Initial mode is "Stack"

  const handleSquareClick = (squareIndex) => {
    if (currentMode === "Stack") {
      if (selectedSquaresStack.includes(squareIndex)) {
        setSelectedSquaresStack(selectedSquaresStack.filter(index => index !== squareIndex));
      } else {
        setSelectedSquaresStack([...selectedSquaresStack, squareIndex]);
      }
    } else if (currentMode === "Opponent") {
      if (selectedSquaresOpponent.includes(squareIndex)) {
        setSelectedSquaresOpponent(selectedSquaresOpponent.filter(index => index !== squareIndex));
      } else {
        setSelectedSquaresOpponent([...selectedSquaresOpponent, squareIndex]);
      }
    }
  };

  const handleClear = () => {
    if (currentMode === "Stack") {
      setSelectedSquaresStack([]);
    } else if (currentMode === "Opponent") {
      setSelectedSquaresOpponent([]);
    }
  };

  const handleSubmit = () => {
    // Combine the selected squares from both modes into a data structure that the backend expects
    const selectedSquares = [
      ...selectedSquaresStack.map(index => ({ index, type: "Stack" })),
      ...selectedSquaresOpponent.map(index => ({ index, type: "Opponent" }))
    ];

    console.log(selectedSquares);    

    if (selectedSquares.length > 0) {
      handleGridSelection(selectedSquares, currentMode); // Pass mode to the handler
      navigate(`/data/${videoId}`);
    } else {
      alert('Please select at least one square.');
    }
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <div className="region-selector">
      <h3>Select Regions</h3>
      <div className="prompt">
        {currentMode === "Stack" ? "Select Stack" : "Select Opponent"}
      </div>
      <button onClick={() => handleModeChange("Stack")}>Select Stack</button>
      <button onClick={() => handleModeChange("Opponent")}>Select Opponent</button>
      <button onClick={handleClear}>Clear</button>
      <ImageDisplay
        firstFrameUrl={firstFrameUrl}
        selectedSquares={
          currentMode === "Stack" ? selectedSquaresStack : selectedSquaresOpponent
        }
        onSquareClick={handleSquareClick}
        currentMode={currentMode}
      />
      <button
        className="submit-button"
        disabled={
          (currentMode === "Stack" && selectedSquaresStack.length === 0) ||
          (currentMode === "Opponent" && selectedSquaresOpponent.length === 0)
        }
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default RegionSelector;
