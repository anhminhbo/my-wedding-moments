import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import AdminDashboard from "./components/AdminDashboard";
import ViewPhotos from "./components/ViewPhotos";
import UploadPhotos from "./components/UploadPhotos";

const backendURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [backendData, setBackendData] = useState(null);
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
    // Check connection with the backend server
    async function checkBackendConnection() {
      try {
        const response = await fetch(`${backendURL}`);

        const data = await response.json(); // Parse response JSON data
        setBackendData(data); // Set backend response data
        setBackendStatus("Connected to Backend successfully!");
      } catch (error) {
        setBackendStatus("Error: " + error.message);
      }
    }

    checkBackendConnection();
  }, []);

  return (
    <>
      <div className="App">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React with BugFixWanderer. PEACE!!
        </a>
        <p>Status: {backendStatus}</p>
        {backendData && (
          <div>
            <p>Response Data from Backend:</p>
            <pre>{JSON.stringify(backendData, null, 2)}</pre>
          </div>
        )}
      </header> */}
        {/* Routes */}
        <Router>
          <Routes>
            <Route path="/" element={<UploadPhotos />} />
            <Route path="/viewPhotos" element={<ViewPhotos />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
