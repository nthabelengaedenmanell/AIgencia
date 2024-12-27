import { useContext, useCallback, useState } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import { useDropzone } from 'react-dropzone';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResults,
        loading,
        resultData,
        setInput,
        input,
    } = useContext(Context);

    const [pdfFile, setPdfFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        if (file?.type === 'application/pdf') {
            setPdfFile(file);
            // You can add additional handling here, like reading the PDF content
        } else {
            alert('Please upload a PDF file');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        multiple: false
    });

    const handleCardClick = (promptText) => {
        setInput(promptText);
    };

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
                            <div
                                className="card"
                                onClick={() =>
                                    handleCardClick("Suggest Some Place To Visit In West Bengal")
                                }
                            >
                                <p>Suggest Some Place To Visit In West Bengal </p>
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
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                <img 
                                    src={assets.gallery_icon} 
                                    alt="Upload PDF" 
                                    className={isDragActive ? 'drag-active' : ''}
                                />
                            </div>
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
                    {pdfFile && (
                        <div className="pdf-info">
                            <p>Uploaded: {pdfFile.name}</p>
                            <button onClick={() => setPdfFile(null)}>Remove</button>
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

