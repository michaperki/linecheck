import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ firstFrameUrl, selectedQuadrant, onQuadrantClick }) => {
  const quadrantStyles = [
    { top: 0, left: 0 },
    { top: 0, right: 0 },
    { bottom: 0, left: 0 },
    { bottom: 0, right: 0 },
  ];

  const handleQuadrantClick = (quadrantIndex) => {
    onQuadrantClick(quadrantIndex);
  };

  return (
    <div className="image-display">
      {quadrantStyles.map((style, index) => (
        <div
          key={index}
          className={`quadrant ${selectedQuadrant === index ? 'selected' : ''}`}
          style={style}
          onClick={() => handleQuadrantClick(index)}
        />
      ))}
      <img
        src={firstFrameUrl}
        alt="First Frame"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
};

export default ImageDisplay;
