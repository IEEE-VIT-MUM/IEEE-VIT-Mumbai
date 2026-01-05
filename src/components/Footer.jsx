import { useEffect } from "react";
import "../Footer.css";
import ieeeLogo from "../assets/IEEE_Logo.png";

export default function Footer() {
  useEffect(() => {
    const form = document.querySelector(".newsletter-form");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing to our newsletter!");
        form.reset();
      });
    }
  }, []);

  return (
    <footer className="ieee-footer" id="contact">
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Subscribe to our newsletter</h2>
            <p className="newsletter-subtitle">
              Be the first to receive updates, tips, and more.
            </p>
          </div>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email..."
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container-new">
          <div className="footer-col brand-col">
            <div className="brand-header">
              <div className="ieee-logo-wrapper">
                <img src={ieeeLogo} alt="IEEE Logo" className="vit-logo" />
              </div>
            </div>

            <p className="brand-description">
              Advancing Technology for Humanity
            </p>

            <div className="social-section">
              <h4 className="section-heading">Follow Us</h4>
              <div className="social-icons">

                <a href="https://www.instagram.com/ieeevit/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon" 
                aria-label="IEEE VIT Instagram">
                  <i className="fab fa-instagram"></i>
                </a>

                <a href="https://www.youtube.com/@ieeevit763" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon" 
                aria-label="IEEE VIT YouTube">
                  <i className="fab fa-youtube"></i>
                </a>

                <a href="https://www.facebook.com/IEEEVIT1"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="IEEE VIT Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a href="https://x.com/vidyalankarieee"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="IEEE VIT on X (formerly Twitter)">
                  <i className="fab fa-x-twitter"></i>
                </a>

                <a href="https://www.linkedin.com/company/ieeevit/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="IEEE VIT LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>

                <a href="https://github.com/IEEE-VIT-MUM/IEEE-VIT-Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="IEEE VIT GitHub">
                  <i className="fab fa-github"></i>
                </a>

              </div>
            </div>

            <div className="cta-button-row">
              <a
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                className="cta-btn join-ieee-btn"
              >
                <i className="fas fa-user-plus"></i> Join IEEE Membership
              </a>
            </div>
          </div>

          <div className="footer-col contact-col">
            <h3 className="section-heading">Contact Us</h3>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:ieee.sb@vit.edu.in">ieee.sb@vit.edu.in</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                <div className="contact-details">
                  <h4>Chairperson</h4>
                  <p className="person-name">Shrut Patil</p>
                  <a href="tel:+919322668948">+91 9322668948</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                <div className="contact-details">
                  <h4>Vice-Chairperson</h4>
                  <p className="person-name">Siddhesh Rajgure</p>
                  <a href="tel:+919324873439">+91 9324873439</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-col map-col">
            <h3 className="section-heading">Our Location</h3>
            <div className="college-name-map-link">
              Vidyalankar Institute of Technology
            </div>

            <div className="map-wrapper">
              <div className="map-overlay"></div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9571064014795!2d72.86795757497592!3d19.021611682171844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfdb3592ae71%3A0x24a513f82882be61!2sVidyalankar%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1765386479050!5m2!1sen!2sin"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="copyright-section">
            <p>© 2025-26 IEEE VIT. All rights reserved.</p>
          </div>
          <div className="single-sentence-footer">
            <p>Building the future through technology and innovation at VIT.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
