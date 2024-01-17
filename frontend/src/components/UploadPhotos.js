import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/uploadPhotos.css";

const backendURL = process.env.REACT_APP_BACKEND_URL;
const UploadPhotos = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const navigate = useNavigate();
  const [showed, setShowed] = useState(true);

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
      setUploadStatus("Upload Successful (Tải hình lên thành công)");
    } catch (error) {
      setUploadStatus(`Upload Unsuccess ,error: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            color: "#DC143C",
            position: "fixed",
            fontFamily: "Brush Script MT",
            textSizeAdjust: "80%",
            fontSize: "2.5vh",
            top: "3%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          Save The Date
          <br /> Anh Minh & Mẫn Thy <br /> 21-01-2024
        </h3>
        <div>
          <form
            class="button-85"
            onSubmit={handleSubmit}
            style={{
              position: "fixed",
              top: "33%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              display: showed ? "none" : "",
            }}
          >
            <div className="custom-file-input">
              <input
                id="fileInput"
                type="file"
                name="Files"
                required
                multiple
                onChange={handleFileInputChange}
              />
              <h4>
                {" "}
                Friend's category: <br /> (Chọn người quen)
              </h4>
              <select name="category" id="category">
                <option value="groom">Groom (Bạn Nhà Chú Rể)</option>
                <option value="bride">Bride (Bạn Nhà Cô Dâu)</option>
                <option value="general">General (Bạn Chung)</option>
              </select>
              <div>
                <label htmlFor="fileInput" id="fileInputLabel">
                  {uploadStatus}
                </label>
              </div>
            </div>
            <button
              type="submit"
              id="myButton"
              style={{
                marginTop: "20px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "3px",
                transition: "background-color 0.3s",
              }}
              onClick={() => setUploadStatus("Uploading...(Đang tải hình...)")}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
      <div>
        <button
          class="button-85"
          style={{
            position: "fixed",
            top: "70%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          onClick={() => setShowed(!showed)}
        >
          Upload Photos
        </button>
        <button
          class="button-85"
          style={{
            position: "fixed",
            top: "80%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          onClick={() => {
            navigate("/viewPhotos");
          }}
        >
          View Photos
        </button>
      </div>
    </div>
  );
};

export default UploadPhotos;
