// src/components/DataDisplay.js

import React, { useState, useEffect } from 'react';
import { getAnalysisResults } from '../utils/mockApiUtils'; // Import the mock API function

const DataDisplay = ({ videoId }) => {
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Fetch analysis results when the component mounts
    fetchAnalysisResults(videoId);
  }, [videoId]);

  const fetchAnalysisResults = async (videoId) => {
    try {
      // Simulate fetching analysis results from the API
      const response = await getAnalysisResults(videoId);

      // Set the analysis data in state
      setAnalysisData(response);
    } catch (error) {
      console.error('Error fetching analysis results:', error);
    }
  };

  return (
    <div className="data-display">
      <h2>Analysis Results</h2>
      {analysisData ? (
        <div>
          {/* Display the analysis data */}
          <pre>{JSON.stringify(analysisData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading analysis results...</p>
      )}
    </div>
  );
};

export default DataDisplay;
