import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Navbar.css";
import whiteVitLogo from "../assets/IEEE_VIT_Logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      // If NOT on homepage → highlight based on route
      if (location.pathname !== "/") {
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.remove("active");

          if (
            (location.pathname === "/about" && link.textContent.trim() === "About Us") ||
            (location.pathname === "/team" && link.textContent.trim() === "Our Team")
          ) {
            link.classList.add("active");
          }
        });
        return;
      }

      // If on homepage → detect section
      let currentSection = "home";

      const sections = document.querySelectorAll("section[id], footer[id]");

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");

        const text = link.textContent.trim();

        if (
          (currentSection === "home" && text === "Home") ||
          (currentSection === "events" && text === "Events") ||
          (currentSection === "contact" && text === "Contact Us")
        ) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run once on load

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={whiteVitLogo} alt="IEEE VIT Logo" className="navbar-logo" />
        </Link>
      </div>

      <nav className="navbar-right">
        <ul>
          {/* Home */}
          <li>
            <Link
              to="/"
              className="nav-link"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
          </li>

          {/* About */}
          <li>
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>

          {/* Team */}
          <li>
            <Link to="/team" className="nav-link">
              Our Team
            </Link>
          </li>

          {/* Events */}
          <li>
            <button
              className="nav-link"
              onClick={() => {
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
                };

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

          {/* Join IEEE */}
          <li>
            <a
              href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer" className="nav-link">
              Join IEEE
            </a>
          </li>

        </ul>
      </nav>
    </header>
  );
}
