import React, { useState } from "react";
import ImageDisplay from "./ImageDisplay";
import ThumbnailDisplay from "./ThumbnailDisplay";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const RegionSelector = ({
  firstFrameUrl,
  thumbnailUrls,
  handleGridSelection,
}) => {
  const navigate = useNavigate();

  const { videoId } = useParams();

  const [selectedSquaresStack, setSelectedSquaresStack] = useState([]);
  const [selectedSquaresHoleCard_A, setSelectedSquaresHoleCard_A] = useState(
    []
  );
  const [selectedSquaresHoleCard_B, setSelectedSquaresHoleCard_B] = useState(
    []
  );
  const [selectedSquaresOpponent, setSelectedSquaresOpponent] = useState([]);
  const [currentMode, setCurrentMode] = useState("Stack");

  const handleSquareClick = (squareIndex) => {
    switch (currentMode) {
      case "Stack":
        if (selectedSquaresStack.includes(squareIndex)) {
          setSelectedSquaresStack(
            selectedSquaresStack.filter((index) => index !== squareIndex)
          );
        } else {
          setSelectedSquaresStack([...selectedSquaresStack, squareIndex]);
        }
        break;
      case "Opponent":
        if (selectedSquaresOpponent.includes(squareIndex)) {
          setSelectedSquaresOpponent(
            selectedSquaresOpponent.filter((index) => index !== squareIndex)
          );
        } else {
          setSelectedSquaresOpponent([...selectedSquaresOpponent, squareIndex]);
        }
        break;
      case "HoleCard_A":
        if (selectedSquaresHoleCard_A.includes(squareIndex)) {
          setSelectedSquaresHoleCard_A(
            selectedSquaresHoleCard_A.filter((index) => index !== squareIndex)
          );
        } else {
          setSelectedSquaresHoleCard_A([
            ...selectedSquaresHoleCard_A,
            squareIndex,
          ]);
        }
        break;
      case "HoleCard_B":
        if (selectedSquaresHoleCard_B.includes(squareIndex)) {
          setSelectedSquaresHoleCard_B(
            selectedSquaresHoleCard_B.filter((index) => index !== squareIndex)
          );
        } else {
          setSelectedSquaresHoleCard_B([
            ...selectedSquaresHoleCard_B,
            squareIndex,
          ]);
        }
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    if (currentMode === "Stack") {
      setSelectedSquaresStack([]);
    } else if (currentMode === "Opponent") {
      setSelectedSquaresOpponent([]);
    } else if (currentMode === "HoleCard_A") {
      setSelectedSquaresHoleCard_A([]);
    } else if (currentMode === "HoleCard_B") {
      setSelectedSquaresHoleCard_B([]);
    } else {
      console.error("Invalid mode:", currentMode);
    }
  };

  const handleSubmit = () => {
    // Combine the selected squares from both modes into a data structure that the backend expects
    const selectedSquares = [
      ...selectedSquaresStack.map((index) => ({ index, type: "Stack" })),
      ...selectedSquaresOpponent.map((index) => ({ index, type: "Opponent" })),
      ...selectedSquaresHoleCard_A.map((index) => ({
        index,
        type: "HoleCard_A",
      })),
      ...selectedSquaresHoleCard_B.map((index) => ({
        index,
        type: "HoleCard_B",
      })),
    ];

    if (selectedSquares.length > 0) {
      handleGridSelection(selectedSquares, currentMode); // Pass mode to the handler
      navigate(`/data/${videoId}`);
    } else {
      alert("Please select at least one square.");
    }
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <div className="region-selector">
      <h3>Select Regions</h3>
      <div className="prompt">
        {currentMode === "Stack"
          ? "Select the stack"
          : currentMode === "Opponent"
          ? "Select the opponent"
          : currentMode === "HoleCard_A"
          ? "Select Hole Card A"
          : currentMode === "HoleCard_B"
          ? "Select Hole Card B"
          : "Invalid mode"}
      </div>
      <button onClick={() => handleModeChange("Stack")}>Select Stack</button>
      <button onClick={() => handleModeChange("HoleCard_A")}>
        Select Hole Card A
      </button>
      <button onClick={() => handleModeChange("HoleCard_B")}>
        Select Hole Card B
      </button>
      <br />

      <button onClick={() => handleModeChange("Opponent")}>
        Select Opponent
      </button>
      <button onClick={handleClear}>Clear</button>
      <ImageDisplay
        firstFrameUrl={firstFrameUrl}
        selectedSquares={
          currentMode === "Stack"
            ? selectedSquaresStack
            : currentMode === "Opponent"
            ? selectedSquaresOpponent
            : currentMode === "HoleCard_A"
            ? selectedSquaresHoleCard_A
            : currentMode === "HoleCard_B"
            ? selectedSquaresHoleCard_B
            : []
        }
        onSquareClick={handleSquareClick}
        currentMode={currentMode}
      />
      <ThumbnailDisplay
        thumbnailUrls={thumbnailUrls}
        onThumbnailClick={handleSquareClick} // Reusing the same click handler for thumbnails
      />
      <button
        className="submit-button"
        disabled={
          (currentMode === "Stack" && selectedSquaresStack.length === 0) ||
          (currentMode === "Opponent" &&
            selectedSquaresOpponent.length === 0) ||
          (currentMode === "HoleCard_A" &&
            selectedSquaresHoleCard_A.length === 0) ||
          (currentMode === "HoleCard_B" &&
            selectedSquaresHoleCard_B.length === 0)
        }
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default RegionSelector;
