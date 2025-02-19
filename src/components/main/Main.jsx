import { useContext, useRef } from "react";
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
    newChat,
      handleFileChange,
    error
  } = useContext(Context);
 const fileInputRef = useRef(null)

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };
    const handleFileUploadClick = () => {
      fileInputRef.current.click();
    }
  return (
    <div className="main">
      <div className="nav">
        <p>AI-gencia</p>
        <img src={assets.user} alt="" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">

              <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest Some Place To Visit In West Bengal")
                }
              >
                <p>Suggest Some Place To Visit In West Bengal </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat </p>
              
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("How to Create a Gyroscope using Disc?")
                }
              >
                <p>How to Create a Gyroscope using Disc?</p>
              
              </div>
              <div
                className="card"
                onClick={() => {
                  handleCardClick(
                    "Create a Script for the youtube video about coding "
                  );
                }}
              >
                <p>Create a Script for the youtube video about coding </p>
             
              </div>
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
         {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
            />
            <div>
              <input
                type="file"
                accept="application/pdf"
                style={{display:'none'}}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
                <img
                  src={assets.gallery_icon}
                  alt=""
                  onClick={()=>{
                      handleFileUploadClick()
                      newChat()
                  }}
              />
              <img src={assets.mic_icon} alt="" />
              <img
                src={assets.send_icon}
                alt=""
                onClick={() => {
                  onSent();
                }}
              />
            </div>
          </div>
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
