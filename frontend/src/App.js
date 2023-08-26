import React, { useState } from 'react';
import VideoUploadComponent from './components/VideoUploadComponent';
import VideoPreviewComponent from './components/VideoPreviewComponent';
import GridSelectionComponent from './components/GridSelectionComponent';
import ColorSelectionComponent from './components/ColorSelectionComponent';
import SubmitButton from './components/SubmitButton';
import ProcessingFeedbackComponent from './components/ProcessingFeedbackComponent';
import DataDisplayComponent from './components/DataDisplayComponent';
import MultipleSelectionSupport from './components/MultipleSelectionSupport';

function App() {
  const [videoURL, setVideoURL] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [selectedColor, setSelectedColor] = useState('red');
  const [processing, setProcessing] = useState(false);
  const [processedData, setProcessedData] = useState(null);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [videoFrame, setVideoFrame] = useState(null);

  // Define your component logic and event handlers here

  const handleVideoUpload = (videoURL) => {
    setVideoURL(videoURL);
  };

  const handleCellClick = (cell) => {
    if (multipleSelection) {
      if (selectedCells.includes(cell)) {
        setSelectedCells(selectedCells.filter((c) => c !== cell));
      } else {
        setSelectedCells([...selectedCells, cell]);
      }
    } else {
      setSelectedCells([cell]);
    }
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handleProcessClick = () => {
    setProcessing(true);
    setProcessedData(null);

    fetch('http://localhost:5000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoURL,
        selectedCells,
        selectedColor,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProcessing(false);
        setProcessedData(data);
        setVideoFrame(data.processed_frame_path);
        console.log("data: ", data);
      });
  };

  const handleToggleMultipleSelection = () => {
    setMultipleSelection(!multipleSelection);
  };

  return (
    <div className="App">
      <h1>Video Processing App</h1>

      {/* Video upload component */}
      <VideoUploadComponent onVideoUpload={handleVideoUpload} />

      {/* Video preview component */}
      {videoURL && <VideoPreviewComponent videoURL={videoURL} />}

      {/* Grid selection component */}
      {videoURL && (
        <GridSelectionComponent
          onCellClick={handleCellClick}
          multipleSelection={multipleSelection}
        />
      )}

      {/* Color selection component */}
      <ColorSelectionComponent
        selectedColor={selectedColor}
        onSelectColor={handleSelectColor}
      />

      {/* Submit button */}
      {videoURL && selectedCells.length > 0 && (
        <SubmitButton onClick={handleProcessClick} />
      )}

      {/* Processing feedback component */}
      {processing && <ProcessingFeedbackComponent />}

      {/* Processed data display component */}
      {processedData && <DataDisplayComponent data={processedData} />}
      
      {/* Multiple selection support */}
      <MultipleSelectionSupport
        onToggleMultipleSelection={handleToggleMultipleSelection}
        multipleSelection={multipleSelection}
      />
    </div>
  );
}

export default App;
