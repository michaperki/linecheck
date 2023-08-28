import React from "react";

const ThumbnailDisplay = ({ thumbnailUrls, onThumbnailClick }) => {
  console.log("thumbnail urls", thumbnailUrls);
  return (
    <div className="thumbnail-display">
      <h4>Thumbnail Images</h4>
      <div className="thumbnail-container">
        {thumbnailUrls ? (
          thumbnailUrls.map((url, index) => (
            <img
              key={index}
              onClick={() => onThumbnailClick(index)}
              src={url}
              alt="thumbnail"
              className="thumbnail"
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailDisplay;
