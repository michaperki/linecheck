// utils/mockApiUtils.js

const BASE_URL = 'http://localhost:5000'; // Update this with your actual backend URL

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

  // Create a FormData object to send the video file
  const formData = new FormData();
  formData.append('video', videoFile);

  // Simulate sending a POST request to the backend's video upload endpoint
  try {
    const response = await fetch(`${BASE_URL}/upload_video`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Video upload failed');
    }

    const data = await response.json();
    
    if (data.success) {
      return { success: true, videoId: data.video_id }; // Update the key to "video_id"
    } else {
      throw new Error('Return of videoId failed');
    }
  } catch (error) {
    console.error(error);
    return { success: false, videoId: null };
  }
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

export const getFirstFrameUrl = async (videoId) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return URL to fetch image from the backend
  return `${BASE_URL}/images/${videoId}/frame.jpg`; // Assuming 'frame.jpg' is the filename of the first frame
};

// Mock function to simulate sending grid selection to the backend
export const sendGridSelection = async (videoId, selectedQuadrants) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(`${BASE_URL}/submit_selection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId, selectedQuadrants }), // Include videoId in the JSON payload
    });

    if (!response.ok) {
      throw new Error('Failed to send grid selection');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending grid selection:', error);
    return { success: false, error: error.message };
  }
};

export const getSelectionData = async (videoId) => {
  try {
    const response = await fetch(`${BASE_URL}/get_selection/${videoId}`);
    const data = await response.json();
    console.log('Fetched selection data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching selection data:', error);
    return null;
  }
};