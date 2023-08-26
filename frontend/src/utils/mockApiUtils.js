// utils/mockApiUtils.js

// Mock function to simulate video upload
export const uploadVideo = async (videoFile) => {
  // Simulate uploading by waiting for a short time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return a mock response with a video ID
  return { videoId: "mocked-video-id" };
};

// Mock function to simulate fetching analysis results from the backend
export const getAnalysisResults = async (videoId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock analysis results
  const mockResults = {
    analysisType: "OCR and Data Analysis",
    videoId: videoId,
    // ... other analysis data ...
  };

  return mockResults;
};

// Mock function to simulate getting the URL of the first frame
export const getFirstFrameUrl = async (videoId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock first frame URL from the public folder
  return process.env.PUBLIC_URL + "/test_frame.jpg";
};

// Mock function to simulate sending grid selection to the backend
export const sendGridSelection = async (selectedQuadrants) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response indicating success
  return { success: true };
};
