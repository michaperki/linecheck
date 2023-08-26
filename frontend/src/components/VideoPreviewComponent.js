import React from 'react';

function VideoPreviewComponent({ videoURL }) {
  // Add your component logic here

  return (
    <div>
      {/* Display the video preview */}
      <video controls>
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPreviewComponent;
