// src/components/RegionSelector.js

import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay';
import { sendGridSelection } from '../utils/mockApiUtils';

const RegionSelector = ({ firstFrameUrl }) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);

  const handleQuadrantClick = (quadrantIndex) => {
    setSelectedQuadrant(quadrantIndex);
  };

  const handleSubmit = async () => {
    // Send the selected quadrant to the backend
    const response = await sendGridSelection(selectedQuadrant);
    if (response.success) {
      alert('Selection submitted successfully!');
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
