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
export const sendGridSelection = async (videoId, selectedRegions) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let formattedRegions = formatSelectedRegions(selectedRegions);

  try {
    const response = await fetch(`${BASE_URL}/submit_selection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId, formattedRegions }), // Include videoId in the JSON payload
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

// Format the selected regions into a data structure that the backend expects
export const formatSelectedRegions = (selectedRegions) => {
  // currently, they are like this:         # selected_regions: [{'index': 2668, 'type': 'Stack'}, {'index': 2733, 'type': 'Stack'}, {'index': 2366, 'type': 'HoleCards'}, {'index': 2549, 'type': 'HoleCards'}]
  // the backend expects them like this:    # selected_regions: ['type': 'Stack', 'indices': [2668, 2733]], ['type': 'HoleCards', 'indices': [2366, 2549]]
  const formattedRegions = [];

  // Group the selected regions by type
  const regionsByType = selectedRegions.reduce((acc, region) => {
    if (!acc[region.type]) {
      acc[region.type] = [];
    }
    acc[region.type].push(region.index);
    return acc;
  }, {});

  // Convert the grouped regions into the format that the backend expects
  for (const [type, squares] of Object.entries(regionsByType)) {
    formattedRegions.push({ type, squares });
  }

  return formattedRegions;
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

export const getOcrResults = async (videoId) => {
  try {
    const response = await fetch(`${BASE_URL}/data/${videoId}`);
    const data = await response.json();
    console.log('Fetched OCR results:', data);
    return data;
  } catch (error) {
    console.error('Error fetching OCR results:', error);
    return null;
  }
}