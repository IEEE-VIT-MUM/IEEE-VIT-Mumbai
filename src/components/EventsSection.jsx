import { useEffect, useMemo, useRef, useState } from "react";
import "../EventsSection.css";

const eventsData = [
  {
    id: 1,
    title: "Fest Calender",
    date: "2024-10-06",
    venue: "VIT Campus",
    tag: "Fest Event",
    poster: "/events/IEEE_Fest_Calender.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 2,
    title: "Guest Seminar",
    date: "2024-10-07",
    venue: "M101",
    tag: "Seminar Event",
    poster: "/events/Guest_Seminar.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 3,
    title: "Escape The Laboratory",
    date: "2024-10-08",
    venue: "M309 & M308",
    tag: "Fun Event",
    poster: "/events/Escape_The_Laboratory.png",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 4,
    title: "Codeager",
    date: "2024-10-09",
    venue: "M509 & M510",
    tag: "Tech Event",
    poster: "/events/Codeager.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 5,
    title: "Vision2Venture",
    date: "2025-01-31",
    venue: "M302 & M315",
    tag: "Startup Pitch Event",
    poster: "/events/Vision2Venture.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 6,
    title: "Virtual Vortex",
    date: "2025-02-11",
    venue: "B105,B203 & Boxing Area",
    tag: "Fun Event",
    poster: "/events/Virtual_Vortex.png",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 7,
    title: "PCB Desiging Workshop",
    date: "2025-08-26",
    venue: "L05",
    tag: "Workshop Event",
    poster: "/events/PCB_Desiging_Workshop.jpg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 8,
    title: "IEEE Day Celebration",
    date: "2025-09-07",
    venue: "VIT Campus",
    tag: "Celebration Event",
    poster: "/events/IEEE_Day_Celebration.jpg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 9,
    title: "Guest Speaker",
    date: "2025-09-08",
    venue: "Online Meeting",
    tag: "Webinar Event",
    poster: "/events/Guest_Speaker.png",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 10,
    title: "Agent Mode On",
    date: "2026-01-20",
    venue: "M201",
    tag: "Agentic AI Workshop",
    poster: "/events/Agent_Mode_On.jpeg",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 11,
    title: "IdeaSphere",
    date: "2026-01-30",
    venue: "M413 & M501",
    tag: "Innovative Pitch",
    poster: "/events/IdeaSphere.png",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 12,
    title: "IEEE Core Interviews",
    date: "2026-02-12",
    venue: "F205",
    tag: "Interview",
    poster: "/events/Core_Interviews.png",
    registerLink: "#",
    infoLink: "#",
  },
  {
    id: 13,
    title: "Hardware Hackathon",
    date: "2026-03-14",
    venue: "VIT Campus",
    tag: "Hybrid 6+2 Hardware Hackathon",
    poster: "/events/Hardware_Hackathon.jpg",
    registerLink: "#",
    infoLink: "#",
  },
];

const FILTERS = ["Upcoming", "Past", "All"];

function classifyEvent(eventDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(eventDateStr);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today ? "Upcoming" : "Past";
}

function formatDate(dateStr) {
  const d = new Date(dateStr);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
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
        <p className="ev-date">{formatDate(event.date)}</p>
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

useEffect(() => {
  const container = scrollRef.current;
  if (!container) return;

  const cards = container.querySelectorAll(".ev-card");
  if (!cards.length) return;

  let targetIndex = 0;

  if (activeFilter === "Past") {
    // Go to latest past event (last in ascending order)
    targetIndex = cards.length - 1;
  }

  if (activeFilter === "All") {
    // Go to latest event overall (last in ascending order)
    targetIndex = cards.length - 1;
  }

  if (activeFilter === "Upcoming") {
    // Default to first upcoming event
    targetIndex = 0;
  }

  const targetCard = cards[targetIndex];
  if (targetCard) {
    container.scrollTo({
      left: targetCard.offsetLeft,
      behavior: "smooth",
    });
  }
}, [activeFilter, filteredEvents]);

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
    <section id="events" className="ev-section">

      <div className="ev-header">
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
