import React from 'react';
import RegionSelector from '../components/RegionSelector';

const AnalysisPage = ({ firstFrameUrl }) => {
  return (
    <div>
      <h1>Analysis Page</h1>
      <RegionSelector firstFrameUrl={firstFrameUrl}/> 
    </div>
  );
};

export default AnalysisPage;
