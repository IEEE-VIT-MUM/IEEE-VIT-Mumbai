import React, { useEffect, useRef, useState } from "react";
import "../About_page.css";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";

// Asset Imports
import ieeeLogo from "../assets/IEEE_Logo.png";
import ieeeVitLogo from "../assets/IEEE_VIT_Logo.png"; 

const AboutPage = () => {
    // 1. Data for Vertical Timeline
    const globalViewItems = [
        { 
            id: 1, 
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png", 
            label: "IEEE" 
        },
        { 
            id: 2, 
            img: "https://ieee.nitk.ac.in/static/img/logo/ieee-r10.png", 
            label: "Region 10" 
        },
        { 
            id: 3, 
            img: "https://ieee.nitk.ac.in/static/img/logo/ieee-india-council.png", 
            label: "India Council" 
        },
        { 
            id: 4, 
            img: "https://ieeebombay.org/wp-content/uploads/2022/09/IEEE-BS-Logo.png", 
            label: "Bombay Section" 
        },
        { 
            id: 5, 
            img: ieeeVitLogo, 
            label: "IEEE VIT" 
        },
    ];

    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        // 2. Initialize Vanta Waves Background
        if (!vantaEffect) {
            setVantaEffect(
                WAVES({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x000000,
                    shininess: 20.0,
                    waveHeight: 13.0,
                    waveSpeed: 0.5,
                    zoom: 0.6,
                    backgroundColor: 0x000000, // Matches your root background
                })
            );
        }

        // 3. Intersection Observer for fade-in animations
        const sections = document.querySelectorAll(".section-fade");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("active");
                });
            },
            { threshold: 0.2 }
        );
        sections.forEach((section) => observer.observe(section));

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div className="about-page-root" ref={vantaRef}>
            <div className="vanta-content-overlay">

                {/* Main Hero Spacer */}
                <section className="hero-section section-fade"></section>

                {/* Global About IEEE Content */}
                <section className="info-section section-fade">
                    <h2>About IEEE</h2>
                    <div className="text-container">
                        <p>
                            IEEE is the world’s largest technical professional organization, committed to advancing technology for the benefit of humanity. With a strong global presence, IEEE brings together engineers, researchers, and innovators to drive technological progress across diverse domains. It empowers the global community through highly cited publications, prestigious conferences, and industry-defining technology standards that form the backbone of modern engineering and innovation. Beyond research and standardization, IEEE places strong emphasis on professional and educational development, offering platforms for lifelong learning, skill enhancement, and collaboration.
                        </p>
                        <p style={{ marginTop: '20px' }}>
                            Through its 500,000+ members and presence in more than 190 countries, widely referenced publications, conferences, technological standards, and professional and educational events, IEEE and its members encourage a worldwide community to create for a better tomorrow. IEEE is the world's most trusted "voice" for engineering, computer, and technology news.
                        </p>
                    </div>
                </section>

                {/* Vertical Timeline Section */}
                <section className="info-section section-fade active">
                    <h2>IEEE VIT Global View</h2>
                    <div className="horizontal-timeline-container">
                        <div className="horizontal-timeline-track">
                            {globalViewItems.map((item, index) => (
                                <div key={item.id} className="h-timeline-item">
                                    {/* Image Node with Wobbly Effect */}
                                    <div className="v-node wobbly-box">
                                        <img src={item.img} alt={item.label} />
                                    </div>
                                    
                                    {/* Label below the node */}
                                    <div className="v-label-container">
                                        <span className="v-label">{item.label}</span>
                                    </div>

                                    {/* Connecting Line (Hidden for the last item) */}
                                    {index !== globalViewItems.length - 1 && (
                                        <div className="h-line-path"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Regional Section */}
                <section className="info-section section-fade">
                    <h2>IEEE Bombay Section</h2>
                    <div className="text-container">
                        <p>
                            The IEEE Bombay Section is one of the most active and influential sections of IEEE in India, serving as a dynamic hub for engineering, research, and technological innovation across the region. It brings together professionals, academics, researchers, and students from diverse technical disciplines to promote knowledge sharing and collaboration. Through technical conferences, workshops, seminars, industry interactions, and student-focused initiatives, the Bombay Section fosters professional growth and innovation at both grassroots and advanced levels.
                        </p>
                    </div>
                </section>

                {/* Local Branch Section */}
                <section className="info-section section-fade">
                    <h2>IEEE VIT</h2>
                    <div className="text-container">
                        <p>
                            IEEE Student Branch VIT is an active student chapter of the global IEEE organization, operating under the Bombay Section (Region 10). Through its diverse Special Interest Groups (SIGs), IEEE VIT fosters a culture of innovation where students conceptualize, design, and build impactful projects. These initiatives go beyond theory, empowering students to apply cutting-edge technology to address real-world challenges and create meaningful solutions for everyday life.
                        </p>
                    </div>
                </section>

                {/* Societies Section (3 Cards in Horizontal Layout) */}
                <section className="info-section section-fade">
                    <h2>Societies</h2>
                    <div className="societies-grid">

                        {/* Society Card 1 */}
                        <div className="society-card wobbly-box">
                            <div className="society-img-wrap">
                                <img src={ieeeLogo} alt="AESS" />
                            </div>
                            <div className="society-text">
                                <h3>Aerospace and Electronic Systems Society</h3>
                                <p>IEEE AESS VIT provides a collaborative platform for students to explore cutting-edge technologies through hands-on projects, technical workshops, expert talks, and research-driven initiatives.</p>
                            </div>
                        </div>

                        {/* Society Card 2 */}
                        <div className="society-card wobbly-box">
                            <div className="society-img-wrap">
                                <img src={ieeeLogo} alt="WIE" />
                            </div>
                            <div className="society-text">
                                <h3>Women in Engineering</h3>
                                <p>The IEEE VIT WIE is dedicated to promoting technical interests among women engineers and scientists. IEEE women student members facilitate the recruitment and retention of women in technical disciplines.</p>
                            </div>
                        </div>

                        {/* Society Card 3 */}
                        <div className="society-card wobbly-box">
                            <div className="society-img-wrap">
                                <img src={ieeeLogo} alt="GRSS" />
                            </div>
                            <div className="society-text">
                                <h3>Geoscience and Remote Sensing Society</h3>
                                <p>GRSS encourages its members to participate in science, engineering, applications, and education linked to the advancement of geoscience and remote sensing for the benefit of society.</p>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;