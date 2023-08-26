// src/pages/AnalysisPage.js

import React from "react";
import RegionSelector from "../components/RegionSelector"; // Import RegionSelector
import ImageDisplay from "../components/ImageDisplay"; // Import VideoDisplay

const AnalysisPage = ({ firstFrameUrl }) => {
  return (
    <div>
      <h1>Analysis Page</h1>
      <RegionSelector firstFrameUrl={firstFrameUrl}/> {/* Add RegionSelector component */}
    </div>
  );
};

export default AnalysisPage;
