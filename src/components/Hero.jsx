import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";
import "../Hero.css";

export default function Hero() {
    const heroRef = useRef(null);
    const vantaRef = useRef(null);

    const fullText = "IEEE VIT-Mumbai Student Branch";
    const breakIndex = "IEEE VIT-Mumbai".length;
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    /* ===============================
       VANTA BACKGROUND
    =============================== */
    useEffect(() => {
        if (!vantaRef.current && heroRef.current) {
            vantaRef.current = WAVES({
                el: heroRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: 0x000000,          // mesh color
                backgroundColor: 0x000000,
                shininess: 20,
                waveHeight: 13,
                waveSpeed: 0.8,
                zoom: 1,
            });
        }

        return () => {
            if (vantaRef.current) {
                vantaRef.current.destroy();
                vantaRef.current = null;
            }
        };
    }, []);

    /* ===============================
       TYPEWRITER EFFECT (FIXED)
    =============================== */
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!deleting && index < fullText.length) {
                setText(fullText.slice(0, index + 1));
                setIndex(index + 1);
            }
            else if (!deleting && index === fullText.length) {
                setDeleting(true);
            }
            else if (deleting && index > 0) {
                setText(fullText.slice(0, index - 1));
                setIndex(index - 1);
            }
            else if (deleting && index === 0) {
                setDeleting(false);
            }
        }, deleting ? 70 : 120);

        return () => clearTimeout(timeout);
    }, [index, deleting]);

    return (
        <section ref={heroRef} className="hero">
            <h1 className="typewriter">
                <span>{text.slice(0, breakIndex)}</span>
                {text.length > breakIndex && (
                    <>
                        <br />
                        <span>{text.slice(breakIndex + 1)}</span>
                    </>
                )}
                <span className="cursor">|</span>
            </h1>

            <p className="subtitle">
                Vidyalankar Institute Of Technology
            </p>
        </section>
    );
}
