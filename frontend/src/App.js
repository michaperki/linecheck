import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import DataDisplay from "./components/DataDisplay";
import Header from "./components/Header";
import { getFirstFrameUrl, generateVideoId } from "./utils/mockApiUtils"; // Import the updated mock API function and generateVideoId

function App() {
  const [firstFrameUrl, setFirstFrameUrl] = useState(null);
  const [videoId, setVideoId] = useState(0); // Store the generated video ID

  useEffect(() => {
    // Fetch the first frame URL when the component mounts
    fetchFirstFrameUrl();
  }, []);

  const fetchFirstFrameUrl = async () => {
    try {
      // Simulate fetching the first frame URL from the API
      const response = await getFirstFrameUrl(videoId);
  
      // Set the first frame URL in state
      setFirstFrameUrl(response);
  
      // Set the video ID in state
      setVideoId(response.videoId);
    } catch (error) {
      console.error("Error fetching first frame URL:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route
            path="/analysis"
            element={<AnalysisPage firstFrameUrl={firstFrameUrl} />}
          />
          <Route
            path="/analysis/:videoId"
            element={<AnalysisPage firstFrameUrl={firstFrameUrl} />}
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
