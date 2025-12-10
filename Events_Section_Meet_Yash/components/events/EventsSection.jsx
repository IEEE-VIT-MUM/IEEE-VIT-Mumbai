import { useEffect, useMemo, useRef, useState } from "react";
import "./EventsSection.css";

const eventsData = [
  {
    id: 1,
    title: "Fest Calender",
    date: "06-10-2024",
    venue: "VIT Campus",
    tag: "Fest Event",
    poster: "/images/events/IEEE_Fest_Calender.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 2,
    title: "Guest Seminar",
    date: "07-10-2024",
    venue: "M101",
    tag: "Seminar Event",
    poster: "/images/events/Guest_Seminar.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 3,
    title: "Escape The Laboratory",
    date: "08-10-2024",
    venue: "M309 & M308",
    tag: "Fun Event",
    poster: "/images/events/Escape_The_Laboratory.png",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 4,
    title: "Codeager",
    date: "09-10-2024",
    venue: "M509 & M510",
    tag: "Tech Event",
    poster: "/images/events/Codeager.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 5,
    title: "Vision2Venture",
    date: "31-01-2025",
    venue: "M302 & M315",
    tag: "Startup Pitch Event",
    poster: "/images/events/Vision2Venture.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 6,
    title: "Virtual Vortex",
    date: "11-02-2025",
    venue: "B105,B203 & Boxing Area",
    tag: "Fun Event",
    poster: "/images/events/Virtual_Vortex.png",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 7,
    title: "PCB Desiging Workshop",
    date: "26-08-2025",
    venue: "L05",
    tag: "Workshop Event",
    poster: "/images/events/PCB_Desiging_Workshop.jpg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 8,
    title: "IEEE Day Celebration",
    date: "07-09-2025",
    venue: "VIT Campus",
    tag: "Celebration Event",
    poster: "/images/events/IEEE_Day_Celebration.jpg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 9,
    title: "Guest Speaker",
    date: "08-09-2025",
    venue: "Online Meeting",
    tag: "Webinar Event",
    poster: "/images/events/Guest_Speaker.png",
    registerLink: "#",
    infoLink: "#",
  },
];

const FILTERS = ["All", "Upcoming", "Past"];

function classifyEvent(eventDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(eventDateStr);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today ? "Upcoming" : "Past";
}

function EventCard({ event }) {
  const status = classifyEvent(event.date);
  const isPast = status === "Past";

  return (
    <article className={`ev-card ${isPast ? "ev-card-past" : ""}`}>
      {/* top meta like NISB */}
      <header className="ev-card-header">
        <p className="ev-tag">{event.tag}</p>
        <h3 className="ev-title">{event.title}</h3>
        <p className="ev-date">{event.date}</p>
      </header>

      {/* poster */}
      <div className="ev-img-wrap">
        <img src={event.poster} alt={event.title} className="ev-img" />
      </div>

      {/* bottom meta */}
      <footer className="ev-card-footer">
        <p className="ev-venue">{event.venue}</p>
      </footer>

      {/* Hover overlay with different buttons for Upcoming vs Past */}
      <div className="ev-overlay">
        {isPast ? (
          <>
            <button className="ev-btn disabled" disabled>
              Event Completed
            </button>
            <a href={event.infoLink} className="ev-btn info">
              View Details
            </a>
          </>
        ) : (
          <>
            <a href={event.registerLink} className="ev-btn register">
              Register
            </a>
            <a href={event.infoLink} className="ev-btn info">
              More Info
            </a>
          </>
        )}
      </div>
    </article>
  );
}

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("Upcoming");
  const scrollRef = useRef(null);

  const filteredEvents = useMemo(() => {
    let result =
      activeFilter === "All"
        ? [...eventsData]
        : eventsData.filter(
            (event) => classifyEvent(event.date) === activeFilter
          );

    // sort oldest → newest
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    return result;
  }, [activeFilter]);

  // when filter changes, scroll back to first card (fix "All" starting in middle)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeFilter]);

  const scrollByAmount = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.querySelector(".ev-card");
    if (!firstCard) return;

    const rect = firstCard.getBoundingClientRect();
    const style = window.getComputedStyle(firstCard);
    const marginLeft = parseFloat(style.marginLeft) || 0; // negative for overlap

    // step = visible width (≈80% of card)
    const step = rect.width + marginLeft;
    const distance = direction === "right" ? step : -step;

    container.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="ev-section">
      <div className="ev-header">
        <p className="ev-kicker">IEEE VIT Student Branch</p>
        <h1 className="ev-heading">Events</h1>
        <p className="ev-subtitle">
          Experience a year filled with flagship fests, cutting-edge technical workshops and dynamic chapter events designed to inspire innovation and growth.
        </p>
      </div>

      <div className="ev-filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`ev-filter-btn ${
              activeFilter === filter ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="ev-scroll-wrapper">
        <button
          className="ev-scroll-btn ev-scroll-btn-left"
          onClick={() => scrollByAmount("left")}
        >
          ‹
        </button>

        <div className="ev-scroll" ref={scrollRef}>
          {filteredEvents.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>

        <button
          className="ev-scroll-btn ev-scroll-btn-right"
          onClick={() => scrollByAmount("right")}
        >
          ›
        </button>
      </div>
    </section>
  );
}
