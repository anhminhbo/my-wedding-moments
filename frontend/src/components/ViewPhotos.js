import React, { useState, useEffect } from 'react';
import "../style/viewPhotos.css";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  const [showFullScreen, setShowFullScreen] = useState(false);
  const imagRef = React.createRef();
  const [getUrl, setUrl] = useState();

  // Fetch all photos
  const fetchAllPhotos = async () => {
    const response = await fetch(`${backEndUrl}/api/photo/getAllPhotos`);
    const data = await response.json();
    return data.data;
  };

  const handleImageClick = (url) => {
    setUrl(url);
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  }

  // Load all photos on initial render
  useEffect(() => {
    const loadAllPhotos = async () => {
      const allPhotos = await fetchAllPhotos();
      setPhotos(allPhotos);
    };

    loadAllPhotos();
  }, []);

  return (
    <div className="container">
      <div className="box">

        {photos.map(photo => (
          <div>
            <img
              referrerPolicy="no-referrer"
              key={photo._id}
              src={photo.gDriveUrl}
              alt={photo.name}
              onClick={() => handleImageClick(photo.gDriveUrl)} />

            {showFullScreen && (
              <div
                className="fullscreen-overlay active"
                onClick={handleCloseFullScreen}
              >
                <div className="fullscreen-image">
                  <img
                    id="fullscreenImg"
                    className="centered-image"
                    src={getUrl}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
