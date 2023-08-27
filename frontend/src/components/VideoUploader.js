// src/components/VideoUploader.js

import React, { useState } from "react";
import { uploadVideo } from "../utils/mockApiUtils"; // Replace with actual API utils
import { useNavigate } from "react-router-dom";

const VideoUploader = ({ setVideoId }) => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);

      try {
        const response = await uploadVideo(selectedFile);

        if (response.videoId) {
          setVideoId(response.videoId); // Update the videoId state
          navigate(`/analysis/${response.videoId}`);
        }

        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading video:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <h2>Upload Your Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !selectedFile}>
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
};

export default VideoUploader;
