import { useEffect } from "react";
import "../Navbar.css";
import whiteVitLogo from "../assets/IEEE_VIT_Logo.png";

export default function Navbar() {
  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Active link on scroll
    const onScroll = () => {
      let current = "";
      const sections = document.querySelectorAll("section[id]");

      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.getAttribute("id");
        }
      });

      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img
          src={whiteVitLogo}
          alt="IEEE VIT Logo"
          className="navbar-logo"
        />
      </div>

      <nav className="navbar-right">
        <ul>
          <li><a href="#past-events" className="nav-link">Home</a></li>
          <li><a href="#upcoming-events" className="nav-link">Events</a></li>
          <li><a href="#about" className="nav-link">About Us</a></li>
          <li><a href="#team" className="nav-link">Our Team</a></li>
          <li><a href="#contact" className="nav-link">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}
