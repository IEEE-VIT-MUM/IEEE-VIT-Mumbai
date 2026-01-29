
import { useEffect } from "react";
import '../About_IEEE.css';

export default function About_IEEE() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, observerOptions);

    const items = document.querySelectorAll(".about-ieee .timeline-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-ieee">

      <section className="timeline">
        <div className="timeline-item right">
          <div className="marker"></div>
          <div className="content">
            <span></span><span></span><span></span><span></span>
            <h3>About IEEE</h3>
            <p>
              IEEE, the Institute of Electrical and Electronics Engineers, is the
              world's largest technical professional organization, focused on
              advancing technology for humanity. With over 417,000 members in 160
              countries, IEEE drives global innovation through highly cited
              publications, conferences, technology standards, and professional
              and educational activities.
            </p>
          </div>
        </div>

        <div className="timeline-item left">
          <div className="marker"></div>
          <div className="content">
            <span></span><span></span><span></span><span></span>
            <h3>Mission</h3>
            <p>
              IEEE's core purpose is to foster technological innovation and
              excellence for the benefit of humanity. We provide a global platform
              for creating a better tomorrow by empowering engineers, scientists,
              and allied professionals to contribute through collaboration.
            </p>
          </div>
        </div>

        <div className="timeline-item right">
          <div className="marker"></div>
          <div className="content">
            <span></span><span></span><span></span><span></span>
            <h3>Vision</h3>
            <p>
              IEEE will be essential to the global technical community and
              recognized worldwide for its significant contributions to improving
              global conditions through technology and innovation.
            </p>
          </div>
        </div>

        <div className="timeline-item left">
          <div className="marker"></div>
          <div className="content">
            <span></span><span></span><span></span><span></span>
            <h3>About IEEE-VIT</h3>
            <p>
              Formed in 2009, the IEEE-Vidyalankar Institute of Technology Student
              Branch has been a hub of activity and excellence, winning multiple
              awards at the Bombay Section and India Council levels.
            </p>
          </div>
        </div>

        <div className="timeline-item right">
          <div className="marker"></div>
          <div className="content">
            <span></span><span></span><span></span><span></span>
            <h3>Our Achievements</h3>
            <p>
              The IEEE Bombay Section Platinum Affiliate Award recognizes our
              exceptional leadership, technical excellence, and dedication to
              organizing impactful workshops, seminars, and professional events.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
