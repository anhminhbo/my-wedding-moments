import React, { useState, useEffect } from 'react';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch all photos
  const fetchAllPhotos = async () => {
    const response = await fetch(`${backEndUrl}/api/photo/getAllPhotos`);
    const data = await response.json();
    return data.data;
  };

  // Load all photos on initial render
  useEffect(() => {
    const loadAllPhotos = async () => {
      const allPhotos = await fetchAllPhotos();
      setPhotos(allPhotos);
    };

    loadAllPhotos();
  }, []);

  return (
    <div>
      {photos.map(photo => (
        <img referrerPolicy="no-referrer" key={photo._id} src={photo.gDriveUrl} alt={photo.name} />
      ))}
    </div>
  );
};

export default PhotoGallery;
