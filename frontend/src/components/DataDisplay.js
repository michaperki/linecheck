import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOcrResults } from '../utils/mockApiUtils'; // Update with actual API function

const DataDisplay = () => {
  const { videoId } = useParams();
  const [ocrResults, setOcrResults] = useState(null);

  useEffect(() => {
    fetchOcrResults();
  }, []);

  const fetchOcrResults = async () => {
    try {
      const results = await getOcrResults(videoId);
      console.log('Fetched OCR results:', results);
      setOcrResults(results);
    } catch (error) {
      console.error('Error fetching OCR results:', error);
    }
  };

  return (
    <div>
      <h2>Data Viewer</h2>
      <h3>OCR Results</h3>
      {ocrResults ? (
        <pre>{JSON.stringify(ocrResults, null, 2)}</pre>
      ) : (
        <p>Loading OCR results...</p>
      )}
    </div>
  );
};

export default DataDisplay;
