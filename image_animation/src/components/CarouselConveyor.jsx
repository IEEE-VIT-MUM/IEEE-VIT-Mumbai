import React from "react";
import "../carousel.css"; 
import AESS from "../assets/AESS.png"
import GRS from "../assets/GRS.svg"
import IEEE from "../assets/IEEE.jpg"
import WIE from "../assets/WIE.jpg"

export default function CarouselConveyor() {
  const images = [IEEE,AESS,GRS,WIE];   
  // Double images for smooth infinite loop
  const doubledImages = [...images, ...images, ...images];

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {doubledImages.map((img, index) => (
          <img key={index} src={img} alt="slide" className="carousel-image" />
        ))}
      </div>
    </div>
  );
}
