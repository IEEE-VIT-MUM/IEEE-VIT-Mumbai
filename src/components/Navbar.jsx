import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Navbar.css";
import whiteVitLogo from "../assets/IEEE_VIT_Logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const wantsEventsScroll = useRef(false); // ref = no re-render, immune to batching

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Watches location changes. If the ref flag is set and we are now on "/",
  // scroll to #events. This fires AFTER React has committed the new page to DOM.
  useEffect(() => {
    if (location.pathname === "/" && wantsEventsScroll.current) {
      wantsEventsScroll.current = false;

      // Double rAF: waits for browser to fully paint layout before measuring
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById("events");
          if (!element) return;
          const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 80;
          const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top, behavior: "smooth" });
        });
      });
    }
  }, [location.pathname]); // only re-run when pathname actually changes

  // Active link highlighting + scroll spy
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
    e.preventDefault();
    closeMenu();

    if (location.pathname === "/") {
      // Already on home page — scroll directly, no navigation needed
      const element = document.getElementById("events");
      if (!element) return;
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      // On a different page — set the ref flag BEFORE navigating
      wantsEventsScroll.current = true;
      navigate("/");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>

        <div className="navbar-logo-wrapper">
          <Link to="/" onClick={() => { window.scrollTo({ top: 0 }); closeMenu(); }}>
            <img src={whiteVitLogo} alt="IEEE VIT Logo" className="navbar-logo" />
          </Link>
        </div>

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

      <nav className={`mobile-sidebar ${menuOpen ? "show" : ""}`}>
        <div className="sidebar-content">
          <button className="mobile-link" onClick={() => { closeMenu(); navigate("/"); window.scrollTo({ top: 0 }); }}>Home</button>
          <button className="mobile-link" onClick={() => { closeMenu(); navigate("/about"); }}>About Us</button>
          <button className="mobile-link" onClick={() => { closeMenu(); navigate("/team"); }}>Our Team</button>
          <button className="mobile-link" onClick={handleEventsClick}>Events</button>
          <a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer" className="mobile-link" onClick={closeMenu}>Join IEEE</a>
        </div>
      </nav>

      {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
}