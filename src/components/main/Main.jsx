import { useContext, useCallback } from "react";
import { useDropzone } from "react-dropzone"; // You'll need to install this package
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
    // Add these to your context
    handleFileUpload,
    uploadedFile,
  } = useContext(Context);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file?.type === "application/pdf") {
      handleFileUpload(file);
    } else {
      alert("Please upload a PDF file");
    }
  }, [handleFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div className="main">
      <div className="nav">
        <h2>AIgencia</h2>
        <img src="https://img.icons8.com/pulsar-gradient/48/artificial-intelligence.png" alt="" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello </span>
              </p>
              <p>How Can i Help You Today?</p>
            </div>
            <div className="cards">
              {/* ... your existing cards ... */}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
            />
            <div>
              <div {...getRootProps()} className="file-upload-area">
                <input {...getInputProps()} />
                <img
                  src={assets.gallery_icon}
                  alt="Upload PDF"
                  className="upload-icon"
                />
              </div>
              <img src={assets.mic_icon} alt="" />
              <img
                src={assets.send_icon}
                alt=""
                onClick={onSent}
              />
            </div>
          </div>
          {uploadedFile && (
            <div className="uploaded-file">
              <p>Uploaded: {uploadedFile.name}</p>
              <button onClick={() => handleFileUpload(null)}>Remove</button>
            </div>
          )}
          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy & Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;