import Hero from '../components/Hero.jsx';
import About_IEEE from '../components/About_IEEE.jsx';
import EventsSection from '../components/EventsSection.jsx';
import ConvenorSection from '../components/ConvenorSection.jsx';

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      
      <section id="about">
        <About_IEEE />
      </section>
      
      <section id="events">
        <EventsSection />
      </section>
      
      <section id="team">
        <ConvenorSection />
      </section>
    </>
  );
}