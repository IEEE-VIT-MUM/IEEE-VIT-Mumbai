import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Navbar.css";
import whiteVitLogo from "../assets/IEEE_VIT_Logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const setActiveByRoute = () => {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        const text = link.textContent.trim();
        if (
          (location.pathname === "/" && text === "Home") ||
          (location.pathname === "/about" && text === "About Us") ||
          (location.pathname === "/team" && text === "Our Team")
        ) {
          link.classList.add("active");
        }
      });
    };

    const onScroll = () => {
      if (location.pathname !== "/") return;
      let currentSection = "home";
      const sections = document.querySelectorAll("section[id], footer[id]");
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id");
        }
      });

      document.querySelectorAll(".nav-link").forEach(link => {
        const text = link.textContent.trim();
        if ((currentSection === "home" && text === "Home") || (currentSection === "events" && text === "Events")) {
          link.classList.add("active");
        } else if (text === "Home" || text === "Events") {
          link.classList.remove("active");
        }
      });
    };

    setActiveByRoute();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  const handleEventsClick = (e) => {
    e.preventDefault(); // Prevents default link behavior to allow custom scroll
    closeMenu();
    
    const scrollToEvents = () => {
      const element = document.getElementById("events");
      if (!element) return;
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navbarHeight, behavior: "smooth" });
    };

    if (location.pathname === "/") {
      scrollToEvents();
    } else {
      navigate("/");
      setTimeout(scrollToEvents, 150);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Mobile Hamburger (Professional Alignment) */}
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>

        {/* Logo - Sizes down automatically via CSS */}
        <div className="navbar-logo-wrapper">
          <Link to="/" onClick={() => { window.scrollTo({ top: 0 }); closeMenu(); }}>
            <img src={whiteVitLogo} alt="IEEE VIT Logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Desktop-only Navigation (Issue 2 Fix) */}
        <nav className="navbar-desktop">
          <ul>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About Us</Link></li>
            <li><Link to="/team" className="nav-link">Our Team</Link></li>
            <li><Link to="/#events" className="nav-link" onClick={handleEventsClick}>Events</Link></li>
            <li><a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer" className="nav-link">Join IEEE</a></li>
          </ul>
        </nav>
      </div>

      {/* Sidebar - Slides from LEFT (Issue 1 Fix) */}
      <nav className={`mobile-sidebar ${menuOpen ? "show" : ""}`}>
        <div className="sidebar-content">
          <button className="mobile-link" onClick={() => { closeMenu(); navigate("/"); window.scrollTo({ top: 0 }); }}>Home</button>
          <button className="mobile-link" onClick={() => { closeMenu(); navigate("/about"); }}>About Us</button>
          <button className="mobile-link" onClick={() => { closeMenu(); navigate("/team"); }}>Our Team</button>
          <button className="mobile-link" onClick={handleEventsClick}>Events</button>
          <a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer" className="mobile-link" onClick={closeMenu}>Join IEEE</a>
        </div>
      </nav>
      
      {/* Background Dimming Overlay */}
      {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
}