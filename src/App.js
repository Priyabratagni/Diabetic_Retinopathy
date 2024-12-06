import React, { useState } from 'react';
import './App.css';

function App() {
  // State to store the uploaded image
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  // Function to handle file input changes
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  // Functions to handle drag-and-drop events
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Functions to handle drag-and-drop events
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  {/*-------------------------- Drag and drop handling -------------------------- */}
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  {/*-------------------------- Clear Button Functioning-------------------------- */}
  const clearImage = () => {
    setUploadedImage(null);
  };

  {/*-------------------------- Toast Message Call-------------------------- */}
  const launchToast = () => {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    setIsBoxVisible(true);
  };

  {/*-------------------------- ---------------------------------------- */}
  
  return (
    // Main Menu
    <div className="app">
      
      <nav className="menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
      </nav>

      {/*-------------------------- Header -------------------------- */}
      <header className="header">
        <h1>DIABETIC RETINOPATHY</h1>
        <p>Upload your image here</p>
      </header>

      {/*-------------------------- Drop Down for iamage -------------------------- */}
      <div
        className={`upload-box ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />

        <p>Drop an image here or click to upload</p>
      </div>

      {/*-------------------------- Submit and Clear Button-------------------------- */}
      <div className="button-group">
        <button onClick={launchToast}>Submit</button>
        <button onClick={clearImage}>Clear</button>
      </div>

      {/*-------------------------- Show Image -------------------------- */}
      {uploadedImage && (
        <div className="image-preview">
          <img src={uploadedImage} alt="Uploaded preview" />
        </div>
      )}

      {/*-------------------------- Toast message -------------------------- */}
      
      <div id="toast">
        <div id="img">Report</div>
        <div id="desc">SEVERE</div>
      </div>
      
      {/*-------------------------- Box for Detailed Report -------------------------- */}
      {isBoxVisible && (
        <div className="box">
          <h3 className="box-title">Report Overview</h3>
          <p className="box-text">
            Sample text comes here.
          </p>

          <h3 className="box-title">Symptoms</h3>
          <p className="box-text">
            Sample text comes here.
          </p>

          <h3 className="box-title">Treatment</h3>
          <p className="box-text">
            Sample text comes here.
          </p>
        </div>
      )}
    
    </div>
  );
}

export default App;
