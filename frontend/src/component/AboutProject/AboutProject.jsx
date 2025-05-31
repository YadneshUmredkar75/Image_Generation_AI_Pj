import React, { useState } from "react";
import "./AboutProject.css";
import demo1 from "../../assets/images/demo1.png";
import demo2 from "../../assets/images/demo2.png";
import demo3 from "../../assets/images/demo3.png";
import demo4 from "../../assets/images/demo4.png";

const images = [
  { src: demo1, alt: "Generated artwork 1" },
  { src: demo2, alt: "Generated artwork 2" },
  { src: demo3, alt: "Generated artwork 3" },
  { src: demo4, alt: "Generated artwork 4" },
];

const AboutProject = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <section className="about">
      <div className="about__container">
        <div className="about__text">
          <h2>About ImageGen AI</h2>
          <p>
            ImageGen AI is a powerful platform that allows users to generate
            high-quality, AI-powered images from text prompts. Whether you're a
            designer, marketer, or enthusiast, our platform gives you creative
            freedom at your fingertips.
          </p>
          <h3>Core Features:</h3>
          <ul>
            <li>Text-to-image generation with real-time rendering</li>
            <li>Download, share, and save images to your profile</li>
            <li>Secure cloud-based storage for generated artwork</li>
            <li>
              Built on cutting-edge AI models (DALL·E, Stable Diffusion, etc.)
            </li>
          </ul>
        </div>

        <div className="about__gallery">
          <h3>Examples from Our Platform</h3>
          <div className="about__images">
            {images.map((img, i) => (
              <div
                key={i}
                className="image-card"
                onClick={() => openModal(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openModal(i);
                }}
                aria-label={`View larger ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} className="clickable-image" />
              </div>
            ))}
          </div>
        </div>

        <div className="about__video">
          <h3>Watch ImageGen AI in Action</h3>
          <div className="video__wrapper">
            <iframe
              src="https://www.youtube.com/embed/E_LW17QZ7C8"
              title="ImageGen AI Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview modal"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <button
              className="modal-prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
            />
            <button
              className="modal-next"
              onClick={goNext}
              aria-label="Next image"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutProject;
