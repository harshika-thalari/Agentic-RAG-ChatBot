import React from 'react';

// IMPORTANT: You must confirm the base URL for your blob storage images.
const IMAGE_BASE_URL = "https://<your-blob-storage-account>.blob.core.windows.net/<your-container-name>/";

const ImageViewer = ({ imageIds }) => {
  if (!imageIds || imageIds.length === 0) {
    return null; // Don't render anything if there are no images
  }

  return (
    <div className="image-viewer">
      <h3>Related Images</h3>
      <div className="image-list">
        {imageIds.map((id, index) => (
          <div key={index} className="image-item">
            <a href={`${IMAGE_BASE_URL}${id}`} target="_blank" rel="noopener noreferrer">
              <img 
                src={`${IMAGE_BASE_URL}${id}`} 
                alt={`Related visual ${index + 1}`} 
              />
            </a>
            <span>{id.split('/').pop()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;