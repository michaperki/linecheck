import React, { useState } from 'react';

function VideoUploadComponent({ onVideoUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadVideo(file);
    }
  };

  const uploadVideo = async (videoFile) => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
  
      const response = await fetch('http://localhost:5000/process_video', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        onVideoUpload(data.processed_frame_path); // Use the correct property from the response
      } else {
        console.error('Video upload failed.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className="video-upload-component">
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
    </div>
  );
}

export default VideoUploadComponent;
