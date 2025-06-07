import { useState } from "react";
import "./GenImg.css";
import axios from "axios";
import { Link } from "react-router-dom";

function GenImg() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate`,
        {
          prompt,
          user: localStorage.getItem("userId") || "anonymous",
          modelUsed: "StableDiffusion",
        }
      );

      if (response.data.imageUrl) {
        setGeneratedImage(response.data.imageUrl);
      } else {
        throw new Error("No image data received");
      }
    } catch (error) {
      console.error("Image generation error:", error);
      setError(error.response?.data?.error || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    try {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (downloadError) {
      console.error("Download failed:", downloadError);
      setError("Failed to download image");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      generateImage();
    }
  };

  return (
    <div className="gen-img-wrapper">
      <div className="gen-img-container">
        <div className="gen-img-header">
          <h1>AI Image Generator</h1>
          <p>Create stunning images from your imagination with AI</p>
        </div>

        <div className="gen-img-content">
          <div className="prompt-section">
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Describe the image you want to generate (e.g., 'A sunset over mountains in anime style')..."
              rows={4}
              disabled={isLoading}
            />
            
            {error && <div className="error-message">{error}</div>}
            
            <button
              onClick={generateImage}
              disabled={isLoading || !prompt.trim()}
              className={`generate-btn ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                "Generate Image"
              )}
            </button>

            <div className="tips">
              <p>Tip: Use descriptive phrases for better results</p>
              <p>Press Ctrl+Enter to generate</p>
            </div>
          </div>

          <div className="preview-section">
            {generatedImage ? (
              <div className="image-result">
                <img 
                  src={generatedImage} 
                  alt="Generated content" 
                  onError={() => setError("Failed to load image")}
                />
                <div className="image-actions">
                  <button onClick={downloadImage} className="download-btn">
                    Download
                  </button>
                  <button 
                    onClick={() => setGeneratedImage(null)} 
                    className="clear-btn"
                  >
                    Clear
                  </button>
                  <Link to="/gallery" className="gallery-link">
                    View Gallery
                  </Link>
                </div>
              </div>
            ) : (
              <div className="image-placeholder">
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <div className="placeholder-icon">🖼️</div>
                    <p>Your generated image will appear here</p>
                    <p className="placeholder-hint">
                      Describe what you want to see in the box above
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenImg;