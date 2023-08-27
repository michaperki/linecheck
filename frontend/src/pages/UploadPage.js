// src/pages/UploadPage.js

import React from 'react';
import VideoUploader from '../components/VideoUploader';

const UploadPage = ({setVideoId}) => {
  return (
    <div>
      <h1>Upload Page</h1>
      <VideoUploader setVideoId={setVideoId}/>
    </div>
  );
};

export default UploadPage;
