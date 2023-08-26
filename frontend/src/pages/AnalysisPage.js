import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import RegionSelector from "../components/RegionSelector";
import ImageDisplay from "../components/ImageDisplay";
import { getFirstFrameUrl } from "../utils/mockApiUtils"; // Import the updated mock API function

const AnalysisPage = () => {
  const { videoId } = useParams(); // Get the videoId from URL parameters
  const [firstFrameUrl, setFirstFrameUrl] = useState(null);

  useEffect(() => {
    // Fetch the first frame URL when the component mounts
    fetchFirstFrameUrl();
  }, [videoId]); // Fetch the first frame URL whenever the videoId changes

  const fetchFirstFrameUrl = async () => {
    try {
      // Simulate fetching the first frame URL from the API
      const response = await getFirstFrameUrl(videoId);

      // Set the first frame URL in state
      setFirstFrameUrl(response);
    } catch (error) {
      console.error("Error fetching first frame URL:", error);
    }
  };

  return (
    <div>
      <h1>Analysis Page</h1>
      {/* Pass the firstFrameUrl to RegionSelector */}
      <RegionSelector firstFrameUrl={firstFrameUrl} />
    </div>
  );
};

export default AnalysisPage;
