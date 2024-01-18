import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/uploadPhotos.css";

const backendURL = process.env.REACT_APP_BACKEND_URL;
const UploadPhotos = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(
    ""
  );
  const navigate = useNavigate();
  const [showed, setShowed] = useState(true);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);

    if (files.length > 0) {
      const fileName = `${files.length} files selected (Đã chọn ${files.length} tấm hình)`;
      setUploadStatus(fileName);
    } else {
      setUploadStatus("Please note: You can only upload up to 5 pictures. <br/> (Xin lưu ý: Bạn chỉ có thể tải lên tối đa 5 tấm)");
    }
  };

  const revertFormToDefault = async (uploadStatusMsg) => {
    setUploadStatus(uploadStatusMsg);
    setSelectedFiles([]);
    document.getElementById("fileInput").value = null; // Reset the input field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const category = e.target.elements.category.value;
      const files = e.target.elements.Files.files;

      if (files.length > 5) {
        revertFormToDefault(
          "You can only upload up to 5 pictures (Chỉ được tải lên tối đa 5 tấm)."
        );
      } else {
        revertFormToDefault("");
      }
      console.log(files);
      console.log(category); // Retrieve the selected category
      formData.set("category", category); // Append the category value to the FormData
      await fetch(`${backendURL}/api/photo/uploadPhotos`, {
        method: "POST",
        body: formData,
      });
      setUploadStatus("Upload Successful (Tải hình ảnh lên thành công)");
    } catch (error) {
      revertFormToDefault(`Upload Unsuccess, error: ${error}`);
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
            color: "#000",
            position: "absolute",
            fontFamily: "'Alex Brush', cursive",
            fontWeight: "600",
            textSizeAdjust: "80%",
            fontSize: "3.5vh",
            top: "10px",
            left: "0",
            right: "0",
            margin: "0 auto",
          }}
        >
          Save The Date
          <br /> 
          Anh Minh & Mẫn Thy 
          <br /> 
          21-01-2024
        </h3>
        <div>
          <form
            class="button-85"
            onSubmit={handleSubmit}
            style={{
              position: "fixed",
              top: "47%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              display: showed ? "none" : "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label htmlFor="fileInput" id="fileInputLabel" style={{
              fontSize: "max(1vw, 16px)",
            }}>
              Please note: You can only upload up to 5 pictures. 
              <br />
              (Xin lưu ý: Bạn chỉ có thể tải lên tối đa 5 tấm hình.)
            </label>
            <div className="custom-file-input">
              <input
                id="fileInput"
                type="file"
                name="Files"
                required
                multiple
                onChange={handleFileInputChange}
              />
              <h4 style={{
                fontSize: "max(1vw, 16px)",
              }}>
                Friend's category: (Chọn người quen)
              </h4>
              <select name="category" id="category" className="select-dropdown">
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
                backgroundColor: "rgb(195 63 48)",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "3px",
                transition: "background-color 0.3s",
              }}
              onClick={() => setUploadStatus("Uploading (Đang tải hình)...")}
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
            top: "77%",
            left: "50%",
            fontSize: "max(1.2vw, 16px)",
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
            top: "85%",
            left: "50%",
            fontSize: "max(1.2vw, 16px)",
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
