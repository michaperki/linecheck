// utils/mockApiUtils.js

// Function to generate a unique video id
export const generateVideoId = () => {
  const numbers = "0123456789";

  // Generate a random 6 digit number
  let videoId = "";
  for (let i = 0; i < 6; i++) {
    videoId += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return videoId;
};

// Mock function to simulate video upload and return a video_id
export const uploadVideo = async (videoFile) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response with a generated video_id
  const videoId = generateVideoId(); // You can create a function to generate unique video ids
  return { success: true, videoId };
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

const BASE_URL = 'http://localhost:5000'; // Update this with your actual backend URL

export const getFirstFrameUrl = async (videoId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return URL to fetch image from the backend
  return `${BASE_URL}/images/${videoId}.jpg`;
};

// Mock function to simulate sending grid selection to the backend
export const sendGridSelection = async (selectedQuadrants) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response indicating success
  return { success: true };
};
