import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Navbar.css";
import whiteVitLogo from "../assets/IEEE_VIT_Logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scroll logic for internal anchors
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      
      // If we are on the home page, just scroll
      if (href.startsWith("#") && location.pathname === "/") {
        e.preventDefault();
        const target = document.querySelector(href === "#" ? "body" : href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    // Active link highlighting on scroll
    const onScroll = () => {
      if (location.pathname !== "/") return;

      let current = "";
      const sections = document.querySelectorAll("section[id]");
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.getAttribute("id");
        }
      });

      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${current}` || (current === "home" && href === "#")) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={whiteVitLogo} alt="IEEE VIT Logo" className="navbar-logo" />
        </Link>
      </div>

      <nav className="navbar-right">
        <ul>
          {/* Home Link */}
          <li><Link to="/" className="nav-link">Home</Link></li>
          
          {/* External Navigation to About_page.jsx */}
          <li><Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/team" className="nav-link">Our Team</Link></li>

          {/* Section Anchors (Works best on Home page) */}
          <li><a href="#events" className="nav-link">Events</a></li>
          <li><a href="#contact" className="nav-link">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}