import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegionSelector from "../components/RegionSelector";
import ImageDisplay from "../components/ImageDisplay";
import { getFirstFrameUrl } from "../utils/mockApiUtils";

function AnalysisPage({ handleGridSelection }) {
  const { videoId } = useParams();
  const [firstFrameUrl, setFirstFrameUrl] = useState(null); // Declare firstFrameUrl state

  useEffect(() => {
    fetchFirstFrameUrl();
  }, [videoId]);

  const fetchFirstFrameUrl = async () => {
    try {
      const response = await getFirstFrameUrl(videoId);
      setFirstFrameUrl(response); // Update the firstFrameUrl state
    } catch (error) {
      console.error("Error fetching first frame URL:", error);
    }
  };

  return (
    <div>
      <h1>Analysis Page</h1>
      <RegionSelector
        firstFrameUrl={firstFrameUrl}
        handleGridSelection={handleGridSelection}
      />
    </div>
  );
}

export default AnalysisPage;
