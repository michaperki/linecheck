// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import DataDisplay from "./components/DataDisplay";
import Header from "./components/Header"; // Import the Header component

import { getFirstFrameUrl } from "./utils/mockApiUtils"; // Import the mock API function

function App() {
  const [firstFrameUrl, setFirstFrameUrl] = useState(null);

  useEffect(() => {
    // Simulate getting the URL of the first frame
    getFirstFrameUrl("mocked-video-id").then((url) => {
      setFirstFrameUrl(url);
    });
  }, []);

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
          <Route path="/data/:videoId" element={<DataDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
