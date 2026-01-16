import { useEffect, useRef, useState } from "react";
import "../ConvenorSection.css"; // Ensure this matches your filename

import bannerImg from "../assets/Convenor_BG_Image.png";
import javedImg from "../assets/Convenor_Javed_Patel.jpg";
import saurabhImg from "../assets/CAO_Saurabh_Mehta.png";

export default function ConvenorSection() {
  const profiles = [
    {
      id: 1,
      name: "Prof. Javed Patel",
      title: "Assistant Professor – VIT",
      quote: "I believe in teaching with real-world examples and inspiring students to think like engineers. I guide students not only to learn, but to apply knowledge through projects.",
      image: javedImg,
    },
    {
      id: 2,
      name: "Dr. Saurabh Mehta",
      title: "Professor & Chief Academic Officer – VIT",
      quote: "As a academic leader, I motivate students to think beyond the classroom and turn ideas into real technology with over 15 years of research experience.",
      image: saurabhImg,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const AUTOPLAY_MS = 5000;

  // Function to change slides with a fade-out/fade-in effect
  const changeSlide = (newIndex) => {
    if (isFading) return;
    setIsFading(true); // Start fade out
    
    setTimeout(() => {
      setCurrentIndex(((newIndex % profiles.length) + profiles.length) % profiles.length);
      setIsFading(false); // Start fade in
    }, 400); // This delay should match your CSS transition time
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide(currentIndex + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const profile = profiles[currentIndex];

  return (
    <section className="banner-container">
      <div className="banner">
        {/* Background Layer */}
        <div className="banner__bg">
          <img src={bannerImg} alt="VIT Background" />
          <div className="banner__overlay"></div>
        </div>

        {/* Branding */}
        <div className="brand">
          <div className="brand__bar"></div>
          <div className="brand__text">
            <span className="title">VIDYALANKAR</span>
            <span className="subtitle">Institute of Technology</span>
          </div>
        </div>

        {/* Content Card */}
        <div className={`content ${isFading ? "fade-out" : "fade-in"}`}>
          <div className="card">
            <div className="avatar-wrap">
              <img className="avatar" src={profile.image} alt={profile.name} />
              <div className="avatar-glow"></div>
            </div>
            
            <div className="info-wrap">
              <h2 className="name">{profile.name}</h2>
              <p className="title-tag">{profile.title}</p>
              <p className="quote">“{profile.quote}”</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button className="nav-btn prev" onClick={() => changeSlide(currentIndex - 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button className="nav-btn next" onClick={() => changeSlide(currentIndex + 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        {/* Dots */}
        <div className="dots">
          {profiles.map((_, idx) => (
            <button 
              key={idx} 
              className={`dot ${idx === currentIndex ? "active" : ""}`} 
              onClick={() => changeSlide(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}