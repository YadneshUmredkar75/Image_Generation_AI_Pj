import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Branding */}
        <div className="footer__section">
          <h2 className="footer__title">ImageGen AI</h2>
          <p className="footer__text">
            Generate high-quality images using AI. Fast, easy, and powerful.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer__section">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer__section">
          <h3 className="footer__heading">Follow Us</h3>
          <div className="footer__socials">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        &copy; {new Date().getFullYear()} ImageGen AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
