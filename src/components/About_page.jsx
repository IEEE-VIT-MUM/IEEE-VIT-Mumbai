import React, { useEffect } from 'react';
import '../About_page.css';
import { tns } from "tiny-slider";

const AboutPage = () => {
    useEffect(() => {
        // Initialize Tiny Slider
        const slider = tns({
            container: '#slider-div',
            items: 1,
            nav: true,
            controls: false,
            speed: 300,
            autoplay: true,
            autoplayButtonOutput: false,
            autoplayHoverPause: true,
            autoplayTimeout: 4000,
            mouseDrag: true,
            responsive: {
                1024: { items: 3 }
            }
        });

        // Intersection Observer for fade animations
        const sections = document.querySelectorAll(".section-fade");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => observer.observe(section));

        return () => slider.destroy();
    }, []);

    return (
        <div className="about-page-root">
            {/* Hero Section */}
            <section className="hero-section section-fade">
                <div className="hero-content">
                    <h1>About Us</h1>
                </div>
            </section>

            {/* About IEEE Section */}
            <section className="info-section section-fade">
                <h2>About IEEE</h2>
                <div className="text-container">
                    <p>
                        IEEE is the world’s largest technical professional organization, committed to advancing technology for the benefit of humanity. 
                        With over 417,000 members in 160 countries, IEEE drives global innovation through highly cited publications, 
                        conferences, and technology standards.
                    </p>
                </div>
            </section>

            {/* Global View Timeline */}
            <section className="info-section section-fade">
                <h2>IEEE VIT Global View</h2>
                <div className="timeline-wrapper">
                    <div className="timeline-track">
                        <span className="timeline-node" style={{ left: '0%' }}></span>
                        <span className="timeline-node" style={{ left: '25%' }}></span>
                        <span className="timeline-node" style={{ left: '50%' }}></span>
                        <span className="timeline-node" style={{ left: '75%' }}></span>
                        <span className="timeline-node" style={{ left: '100%' }}></span>
                    </div>
                    <div className="timeline-grid">
                        <div className="node-item">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png" alt="IEEE" />
                            <p>IEEE</p>
                        </div>
                        <div className="node-item">
                            <img src="https://ieee.nitk.ac.in/static/img/logo/ieee-r10.png" alt="Region 10" />
                            <p>Region 10</p>
                        </div>
                        <div className="node-item">
                            <img src="https://ieee.nitk.ac.in/static/img/logo/ieee-india-council.png" alt="India Council" />
                            <p>India Council</p>
                        </div>
                        <div className="node-item">
                            <img src="https://ieeebombay.org/wp-content/uploads/2022/09/IEEE-BS-Logo.png" alt="Bombay Section" />
                            <p>Bombay Section</p>
                        </div>
                        <div className="node-item">
                            <p className="vit-label">IEEE VIT</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Societies Slider */}
            <section className="info-section section-fade">
                <h2>Societies</h2>
                <div id="slider-div">
                    <div className="slide-item">
                        <div className="society-card">
                            <img src="https://ieee-aess.org/files/ieeeaess/styles/large/public/images/media/photos/aess_logo_2011_no-text_COLOR_300dpi_registered.png" alt="AESS" />
                            <h3>Aerospace and Electronic Systems</h3>
                            <p>IEEE AESS VIT provides a collaborative platform for students to explore cutting-edge technologies.</p>
                        </div>
                    </div>
                    <div className="slide-item">
                        <div className="society-card">
                            <img src="https://ieee.nitk.ac.in/static/img/logo/wie.png" alt="WIE" />
                            <h3>Women in Engineering</h3>
                            <p>Dedicated to promoting technical interests among women engineers and scientists.</p>
                        </div>
                    </div>
                    {/* Add more slides as needed */}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;