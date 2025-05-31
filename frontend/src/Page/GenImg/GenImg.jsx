import { useState } from 'react';
import './GenImg.css';

function GenImg() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await mockImageGeneration(prompt);
      setGeneratedImage(response.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  const mockImageGeneration = (prompt) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockImageUrl = `https://source.unsplash.com/random/800x600/?${encodeURIComponent(prompt)}`;
        resolve({ imageUrl: mockImageUrl });
      }, 2000);
    });
  };

  return (
    <div className="gen-img-wrapper">
      <div className="gen-img-container">
        <div className="gen-img-header">
          <h1>Image Generator</h1>
          <p>Create stunning images with AI</p>
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
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          <div className="preview-section">
            {generatedImage ? (
              <div className="image-result">
                <img src={generatedImage} alt="Generated content" />
                <button className="download-btn">Download</button>
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