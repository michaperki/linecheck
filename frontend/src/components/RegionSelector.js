import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay';

const RegionSelector = ({ firstFrameUrl, handleGridSelection }) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);

  const handleQuadrantClick = (quadrantIndex) => {
    setSelectedQuadrant(quadrantIndex);
  };

  const handleSubmit = () => {
    // Call the handleGridSelection function from props to send grid selection
    if (selectedQuadrant !== null) {
      handleGridSelection(selectedQuadrant);
    } else {
      alert('Please select a quadrant.');
    }
  };

  return (
    <div className="region-selector">
      <h3>Select Regions</h3>
      <ImageDisplay
        firstFrameUrl={firstFrameUrl}
        selectedQuadrant={selectedQuadrant}
        onQuadrantClick={handleQuadrantClick}
      />
      <button
        className="submit-button"
        disabled={selectedQuadrant === null}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default RegionSelector;
