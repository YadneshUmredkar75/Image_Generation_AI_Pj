import { useState } from "react";
import "./GenImg.css";

function GenImg() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/genimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          user: "665d2ac301a17db16b9a2749", // Replace with your user ID if needed
          modelUsed: "StableDiffusion", // Example model
        }),
      });

      const data = await response.json();

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        alert("Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              rows={4}
            />
            <button
              onClick={generateImage}
              disabled={isLoading}
              className="generate-btn"
            >
              {isLoading ? "Generating..." : "Generate Image"}
            </button>
          </div>

          <div className="preview-section">
            {generatedImage ? (
              <div className="image-result">
                <img src={generatedImage} alt="Generated content" />
                <button onClick={downloadImage} className="download-btn">
                  Download
                </button>
              </div>
            ) : (
              <div className="image-placeholder">
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <p>Your generated image will appear here</p>
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
