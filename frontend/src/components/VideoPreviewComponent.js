import React from 'react';

function VideoPreviewComponent({ videoURL }) {
  return (
    <div className="video-preview-component">
      <h2>Video Preview</h2>
      <img src={videoURL} alt="Video Preview" />
    </div>
  );
}

export default VideoPreviewComponent;
