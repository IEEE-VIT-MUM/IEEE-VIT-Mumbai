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

  /* ================= SCROLL ACTIVE LOGIC ================= */
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

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }

    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");

      const text = link.textContent.trim();

      if (
        (currentSection === "home" && text === "Home") ||
        (currentSection === "events" && text === "Events")
      ) {
        link.classList.add("active");
      }

    });

  };

  setActiveByRoute();   // ⭐ IMPORTANT
  window.addEventListener("scroll", onScroll);

  return () => window.removeEventListener("scroll", onScroll);

}, [location]);

  /* ================= EVENTS SCROLL ================= */
  const scrollToEvents = () => {

    const element = document.getElementById("events");
    if (!element) return;

    const navbarHeight =
      document.querySelector(".navbar")?.offsetHeight || 80;

    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;

    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    closeMenu();
  };

  /* ================= JSX ================= */
  return (
    <header className="navbar">

      {/* LEFT LOGO */}
      <div className="navbar-left">
        <Link to="/" onClick={() => window.scrollTo({ top: 0 })}>
          <img src={whiteVitLogo} alt="IEEE VIT Logo" className="navbar-logo" />
        </Link>
      </div>

      {/* RIGHT BLOCK (HAMBURGER + DESKTOP NAV) */}
      <div className="navbar-right-block">

        {/* HAMBURGER */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="navbar-right">
          <ul>

            <li>
              <Link
                to="/"
                className="nav-link"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  closeMenu();
                }}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="nav-link"
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/team"
                className="nav-link"
                onClick={closeMenu}
              >
                Our Team
              </Link>
            </li>

            <li>
              <button
                className="nav-link"
                onClick={() => {

                  closeMenu();

                  if (location.pathname === "/") {
                    scrollToEvents();
                  } else {
                    navigate("/");
                    setTimeout(scrollToEvents, 150);
                  }

                }}
              >
                Events
              </button>
            </li>

            <li>
              <a
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                onClick={closeMenu}
              >
                Join IEEE
              </a>
            </li>

          </ul>
        </nav>

      </div>

      {/* MOBILE PANEL */}
      <nav className={`mobile-menu ${menuOpen ? "show" : ""}`}>

        <button
          className="mobile-link"
          onClick={() => {
            closeMenu();

            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 150);
            }
          }}
        >
          Home
        </button>

        <button
          className="mobile-link"
          onClick={() => {
            closeMenu();
            navigate("/about");
          }}
        >
          About Us
        </button>

        <button
          className="mobile-link"
          onClick={() => {
            closeMenu();
            navigate("/team");
          }}
        >
          Our Team
        </button>

        <button
          className="mobile-link"
          onClick={() => {

            closeMenu();

            if (location.pathname === "/") {
              scrollToEvents();
            } else {
              navigate("/");
              setTimeout(scrollToEvents, 150);
            }

          }}
        >
          Events
        </button>

        <a
          href="https://www.ieee.org/membership/join/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-link"
          onClick={closeMenu}
        >
          Join IEEE
        </a>

      </nav>

    </header>
  );
}