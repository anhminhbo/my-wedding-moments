import React, { useState } from "react";
const backendURL = process.env.REACT_APP_BACKEND_URL;
const UploadPhotos = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);

    if (files.length > 0) {
      const fileName =
        files.length === 1 ? files[0].name : `${files.length} files selected`;
      setUploadStatus(fileName);
    } else {
      setUploadStatus("Select Files");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const category = e.target.elements.category.value;
      console.log(category); // Retrieve the selected category
      formData.set("category", category); // Append the category value to the FormData
      await fetch(`${backendURL}/api/photo/uploadPhotos`, {
        method: "POST",
        body: formData,
      });
      setUploadStatus("Successfully uploaded to drive");
    } catch (error) {
      setUploadStatus(`Was not uploaded: ${error}`);
      console.error(error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333" }}>
          Select Files to Upload To Google Drive
        </h2>
        <p style={{ display: "none" }}>{uploadStatus}</p>
        <form onSubmit={handleSubmit}>
          <div className="custom-file-input">
            <input
              id="fileInput"
              type="file"
              name="Files"
              required
              multiple
              onChange={handleFileInputChange}
            />
            <h2> Category</h2>
            <select name="category" id="category">
              <option value="groom">Groom</option>
              <option value="bride">Bride</option>
              <option value="general">General</option>
            </select>
            <label htmlFor="fileInput" id="fileInputLabel">
              {uploadStatus}
            </label>
          </div>
          <button
            type="submit"
            id="myButton"
            style={{
              display: "block",
              marginTop: "20px",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "3px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <img
        src="https://drive.google.com/uc?export=view&id=1V0topsC7vvLGTzhOxYb02fyHvDVMkVEN"
        alt="Your Image"
      />
    </div>
  );
};

export default UploadPhotos;
