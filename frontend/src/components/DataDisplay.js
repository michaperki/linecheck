import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSelectionData } from '../utils/mockApiUtils';

const DataDisplay = () => {
  const { videoId } = useParams();
  const [selectionData, setSelectionData] = useState(null);

  useEffect(() => {
    fetchSelectionData();
  }, []);

  const fetchSelectionData = async () => {
    try {
      const data = await getSelectionData(videoId);
      console.log('Fetched selection data:', data); // Log the fetched data
      setSelectionData(data);
    } catch (error) {
      console.error('Error fetching selection data:', error); // Log any errors
    }
  };

  return (
    <div>
      <h2>Data Viewer</h2>
      {selectionData ? (
        <pre>{JSON.stringify(selectionData.selected_quadrants, null, 2)}</pre>
      ) : (
        <p>Loading selection data...</p>
      )}
    </div>
  );
};

export default DataDisplay;
