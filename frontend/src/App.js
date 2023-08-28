import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import DataDisplay from "./components/DataDisplay";
import Header from "./components/Header";
import { getThumbnailUrls, sendGridSelection } from "./utils/mockApiUtils"; // Import the necessary utility functions

function App() {
  const [firstFrameUrl, setFirstFrameUrl] = useState(null);
  const [thumbnailUrls, setThumbnailUrls] = useState(null);
  const [videoId, setVideoId] = useState(""); // Initialize videoId as an empty string

  useEffect(() => {
    // Fetch the first frame URL and video ID when the component mounts
    fetchThumbnailData();
  }, []);

  const fetchThumbnailData = async () => {
    try {
      // Fetch the thumbnail URLs
      const thumbnailUrls = await getThumbnailUrls(videoId);
      setThumbnailUrls(thumbnailUrls);
      setFirstFrameUrl(thumbnailUrls[0]);
    } catch (error) {
      console.error("Error fetching thumbnail data:", error);
    }
  };

  const handleGridSelection = async (selectedRegions) => {
    try {
      // Send grid selection to the backend
      const response = await sendGridSelection(videoId, selectedRegions);
      if (response.success) {
        alert('Selection submitted successfully!');
      }
    } catch (error) {
      console.error("Error sending grid selection:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage setVideoId={setVideoId}/>} />
          <Route
            path="/analysis"
            element={<AnalysisPage firstFrameUrl={firstFrameUrl} />}
          />
          <Route
            path="/analysis/:videoId"
            element={
              <AnalysisPage
                firstFrameUrl={firstFrameUrl}
                thumbnailUrls={thumbnailUrls}
                handleGridSelection={handleGridSelection}
              />
            }
          />
          <Route
            path="/data/:videoId"
            element={<DataDisplay videoId={videoId} />} // Pass the generated video ID to DataDisplay
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
