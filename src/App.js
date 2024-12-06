import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State variables
  const [uploadedImageFile, setUploadedImageFile] = useState(null); // For file data
  const [uploadedImage, setUploadedImage] = useState(null); // For preview
  const [isDragging, setIsDragging] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null); // Diagnosis result

  // Function to handle file input changes
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImageFile(file); // Save the file to state
      setUploadedImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Drag-and-drop event handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedImageFile(file); // Save the file to state
      setUploadedImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Clear the uploaded image and results
  const clearImage = () => {
    setUploadedImageFile(null);
    setUploadedImage(null);
    setDiagnosis(null);
    setIsBoxVisible(false);
  };

  const fetchPrediction = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Return the data object directly
    } catch (error) {
      console.error("Error in fetchPrediction:", error);
      throw error; // Pass the error to the calling function
    }
  };

/**------------------------ Handle Submit Button ------------------------------------------------- */

  const handleSubmit = async () => {
    if (!uploadedImageFile) {
        alert("Please upload an image before submitting.");

        // Show toast for the missing file scenario
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");



        desc.textContent = "No file uploaded. Please upload a file.";
        toast.className = "show";
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 5000);

        return;
    }

    const formData = new FormData();
    formData.append("file", uploadedImageFile);

    try {
        const data = await fetchPrediction(formData);

        console.log("Raw Prediction:", data.raw_prediction); // For debugging
        console.log("Severity:", data.severity); // For debugging

        // Update severity in state and show toast with fetched severity
        setDiagnosis(data.raw_prediction);

        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");

        desc.textContent = `Severity: ${data.severity}`;
        toast.className = "show";
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 5000);

        setIsBoxVisible(true); // Show the report
    } catch (error) {
        console.error("Error while fetching prediction:", error);

        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");

        desc.textContent = "Something went wrong. Please try again.";
        toast.className = "show";
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 5000);

        alert("Something went wrong. Please try again.");
    }
};


/**------------------------ Handle Submit Button ------------------------------------------------- */

  // Predefined texts for each condition
  const reports = {
    0: {
      overview: "The medical imaging analysis reveals a positive finding of no diabetic retinopathy detected in the patient's retinal scan. This result indicates that the retinal blood vessels appear structurally intact and show no visible signs of diabetes-related damage or deterioration. The clear imaging suggests that the patient's blood sugar levels have been well-managed, and the delicate network of blood vessels in the eye remains healthy and uncompromised. Such a diagnosis is encouraging for the patient, as it means there are currently no observable complications affecting the retina's vascular system. However, this result does not eliminate the need for continued regular eye examinations, as diabetic retinopathy can develop over time, and ongoing monitoring remains crucial for maintaining long-term eye health and early detection of any potential future changes.",
      symptoms: "The comprehensive eye examination reveals that the patient's eyes appear completely healthy, with no visible symptoms of underlying ocular conditions. During the detailed assessment, the ophthalmologist observed clear, well-defined retinal structures, unobstructed blood vessels, and a normal optic disc without any signs of inflammation, degradation, or abnormal growths. The ocular surfaces, including the cornea, lens, and retina, demonstrate optimal clarity and function, indicating excellent eye health. This positive evaluation suggests that the patient's visual system is functioning effectively, with no immediate concerns requiring medical intervention. Despite the reassuring findings, the medical professional recommends continuing routine eye screenings to maintain proactive monitoring of overall eye health and to detect any potential changes that might develop in the future.",
      treatment: "Maintaining a healthy lifestyle and adhering to regular check-ups are crucial for preventing and managing potential health complications. This approach involves a comprehensive strategy that encompasses balanced nutrition, consistent physical activity, stress management, and proactive medical screenings. By eating a diet rich in fruits, vegetables, whole grains, and lean proteins, individuals can support their overall health and reduce the risk of chronic conditions. Regular exercise, targeting at least 150 minutes of moderate-intensity activity per week, helps maintain optimal body weight, improves cardiovascular health, and boosts immune function. Scheduling routine medical check-ups, including eye exams, blood tests, and comprehensive health screenings, allows for early detection of potential issues and enables healthcare professionals to provide timely interventions and personalized health guidance.",
    },
    1: {
      overview: "A mild diabetic retinopathy diagnosis indicates the early stages of diabetes-related changes in the retinal blood vessels. The medical imaging reveals slight microaneurysms or small areas of vessel wall weakening, suggesting initial vascular damage caused by prolonged elevated blood sugar levels. These early changes do not typically significantly impact vision but serve as a critical warning sign for the need to intensify diabetes management and implement preventive strategies. Healthcare professionals recommend more frequent eye examinations, strict blood glucose control, lifestyle modifications, and potentially targeted treatments to slow the progression of retinal vessel deterioration and preserve long-term visual health.",
      symptoms: "Microaneurysms are small, localized bulges that develop in the tiny blood vessels of the retina, representing an early and subtle sign of diabetic retinopathy. These microscopic outpouchings occur when the walls of the retinal blood vessels weaken due to prolonged exposure to high blood sugar levels, causing them to balloon outward in tiny, barely visible spots. These delicate vascular changes are typically the first detectable indication of potential diabetic eye damage, signaling the importance of careful diabetes management and regular comprehensive eye examinations to monitor and prevent further progression of retinal complications.",
      treatment: "Monitoring blood sugar levels requires consistent medical supervision and proactive management. Regular glucose testing, maintaining a detailed health log, and working closely with healthcare professionals are essential. Implementing a balanced diet, engaging in regular physical activity, adhering to medication regimens, and managing stress contribute to effective diabetes control and prevention of potential complications.",
    },
    2: {
      overview: "Moderate diabetic retinopathy represents a progressive stage of diabetes-related eye damage, characterized by more extensive vascular changes in the retina. The medical imaging reveals increased microaneurysms, areas of retinal bleeding, and potential swelling of blood vessels that can compromise visual clarity. This diagnostic finding indicates a significant advancement in retinal vessel deterioration, signaling the urgent need for comprehensive diabetes management and specialized ophthalmological interventions. Healthcare professionals recommend more frequent eye examinations, strict blood glucose control, and potentially targeted treatments such as laser therapy or injections to prevent further vision loss. The diagnosis serves as a critical warning, emphasizing the importance of proactive medical care and lifestyle modifications to preserve long-term eye health and prevent potential blindness.",
      symptoms: "The medical imaging reveals a critical condition where retinal blood vessels have become swollen and obstructed, indicating advanced vascular damage typical of progressive diabetic retinopathy. These compromised blood vessels demonstrate significant inflammation and blockages that impair normal blood circulation within the delicate retinal tissues, potentially disrupting oxygen and nutrient delivery to critical eye structures. The swelling and blockages can lead to reduced visual acuity, increased risk of hemorrhaging, and potential formation of abnormal new blood vessels that may further complicate retinal health. Such vascular changes represent a serious progression of diabetes-related eye complications, highlighting the urgent need for comprehensive medical intervention and stringent diabetes management strategies. Without appropriate medical treatment and lifestyle modifications, these compromised blood vessels can significantly increase the risk of permanent vision loss and other severe ocular complications.",
      treatment: "Strict blood sugar control is paramount in managing diabetic retinopathy and preventing further vision deterioration, requiring a comprehensive approach to diabetes management. This involves meticulous monitoring of glucose levels, adherence to prescribed medications, maintaining a balanced diet, and implementing regular physical activity to stabilize metabolic function. Laser treatments, specifically photocoagulation, emerge as a critical medical intervention designed to seal leaking blood vessels and prevent the growth of abnormal new vessels in the retina. The procedure involves targeting specific areas of the retina with precise laser energy, creating small scars that help stop vessel leakage and reduce the risk of severe vision loss. Healthcare professionals recommend a multidisciplinary treatment strategy that combines medical interventions, lifestyle modifications, and regular ophthalmological monitoring to effectively manage the progression of diabetic eye complications and preserve long-term visual health.",
    },
    3: {
      overview: "Severe Diabetic Retinopathy detected.",
      symptoms: "Significant blood vessel blockages and bleeding in the retina.",
      treatment: "Laser therapy or other advanced treatments are advised.",
    },
    4: {
      overview: "Proliferative Diabetic Retinopathy detected.",
      symptoms: "Growth of abnormal blood vessels in the retina leading to severe vision problems.",
      treatment: "Immediate treatment including surgery may be required.",
    },
  };

  return (
    <div className="app">
      <nav className="menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
      </nav>

      <header className="header">
        <h1>DIABETIC RETINOPATHY</h1>
        <p>Upload your image here</p>
      </header>

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

      <div className="button-group">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={clearImage}>Clear</button>
      </div>

      {uploadedImage && (
        <div className="image-preview">
          <img src={uploadedImage} alt="Uploaded preview" />
        </div>
      )}

      {isBoxVisible && diagnosis !== null && reports[diagnosis] ? (
          <div className="box">
              <h2 className="box-heading">Diagnosis Report</h2>
              <h3 className="box-title">Report Overview</h3>
              <p className="box-text">{reports[diagnosis].overview}</p>

              <h3 className="box-title">Symptoms</h3>
              <p className="box-text">{reports[diagnosis].symptoms}</p>

              <h3 className="box-title">Treatment</h3>
              <p className="box-text">{reports[diagnosis].treatment}</p>
          </div>
      ) : (
          null
      )}


    <div id="toast">
      <div id="desc">A notification message...</div>
    </div>

    </div>
  );
}

export default App;
