// src/components/AnimatedEventsCalendar.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { sampleEvents } from '../data/events';
import '../AnimatedEventsCalendar.css'; // Import the pure CSS file

// Utility function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// --- Custom Hook: useModalState ---
const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [events, setEvents] = useState([]);

  const openModal = useCallback((eventList) => {
    setEvents(eventList);
    setIsOpen(true);
    // Start the animation slightly delayed for DOM rendering
    setTimeout(() => setIsAnimating(true), 10); 
  }, []);

  const closeModal = useCallback(() => {
    setIsAnimating(false); // Trigger the "genie-out" animation
  }, []);

  return { isOpen, isAnimating, events, openModal, closeModal, setIsOpen };
};

// --- Sub-Component: EventModal ---
const EventModal = ({ isAnimating, isOpen, events, onClose, setIsOpen }) => {
  const modalRef = useRef(null);
  
  // Clean up state after the animation completes
  const handleAnimationEnd = (e) => {
    // Check for the specific animation name to ensure the state only updates 
    // when the 'genieOut' animation finishes on the modal content itself.
    if (e.animationName === 'genieOut') {
      if (!isAnimating) {
        setIsOpen(false);
      }
    }
  };

  // Close on ESC key press
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && isAnimating) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isAnimating, onClose]);

  if (!isOpen && !isAnimating) return null;

  const animationClass = isAnimating
    ? 'genie-modal-content-in'
    : 'genie-modal-content-out';

  return (
    // Backdrop
    <div
      className={`modal-backdrop ${isAnimating ? 'active' : 'inactive'}`}
      onClick={onClose} 
    >
      {/* Modal Content - The Genie */}
      <div
        id="genie-modal-content"
        ref={modalRef}
        className={`genie-modal-content ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e) => e.stopPropagation()} 
        aria-modal="true"
        role="dialog"
      >
        <h3 className="modal-title">
          Event Details
        </h3>
        
        <p className="modal-subtitle">
            Total Events: {events.length}
        </p>

        <div className="modal-events-list">
          {events.map((event) => (
            <div key={event.id} className="event-detail-card">
              <div className="event-header">
                <div className={`event-indicator ${event.categoryColorClass}`}></div>
                <h4 className="event-title">{event.title}</h4>
              </div>
              <p className="event-description">{event.description}</p>
              <p className="event-time">
                <span className="event-time-label">Time:</span> {event.time}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="modal-close-button"
          aria-label="Close event details"
        >
            &times;
        </button>
      </div>
    </div>
  );
};


// --- Main Component: AnimatedEventsCalendar ---
const AnimatedEventsCalendar = () => {
  const today = useMemo(() => new Date(), []);
  // Start the calendar on a relevant month, e.g., the first month of events (September 2026)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); 
  const [transitionDirection, setTransitionDirection] = useState(0); // 1: Next, -1: Prev, 0: None

  // Modal State Management
  const { isOpen, isAnimating, events, openModal, closeModal, setIsOpen } = useModalState();

  // Memoize event data for quick lookup by date
  const eventsByDate = useMemo(() => {
    return sampleEvents.reduce((acc, event) => {
      const dateKey = event.date;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, []);

  // Calendar logic
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const monthName = (date) => date.toLocaleDateString('en-US', { month: 'long' });
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalDays = daysInMonth(currentYear, currentMonth);
  const firstDay = firstDayOfMonth(currentYear, currentMonth); // 0 = Sunday

  // Generate the calendar grid
  const calendarDays = useMemo(() => {
    const days = [];
    // Adjust for starting Monday (1) to Sunday (0)
    const startDayOfWeek = 1; // 1 for Monday
    let paddingDays = (firstDay === 0) ? 6 : firstDay - startDayOfWeek;
    
    // Add padding for the first day of the month
    for (let i = 0; i < paddingDays; i++) {
      days.push({ day: null, dateKey: null, isCurrentMonth: false, key: `prev-${i}` });
    }

    // Add current month days
    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(currentYear, currentMonth, i);
      const dateKey = formatDate(dayDate);
      // Check today against the actual current date, not the calendar date
      const isToday = formatDate(today) === dateKey; 
      const hasEvents = !!eventsByDate[dateKey];

      days.push({
        day: i,
        dateKey,
        isCurrentMonth: true,
        isToday,
        hasEvents,
        key: dateKey,
      });
    }

    // Add padding for next month (to fill the grid to 6 rows)
    const remainingSlots = 42 - days.length; 
    for (let i = 0; i < remainingSlots; i++) {
      days.push({ day: null, dateKey: null, isCurrentMonth: false, key: `next-${i}` });
    }

    return days;
  }, [currentYear, currentMonth, firstDay, totalDays, today, eventsByDate]);


  // Navigation Handlers
  const changeMonth = (delta) => {
    setTransitionDirection(delta);
    
    // Create a new date object to update month
    const newDate = new Date(currentYear, currentMonth + delta, 1);
    
    // Use a small timeout to apply the transition class before updating content
    setTimeout(() => {
        setCurrentDate(newDate); 
        // Reset transition direction after content update
        setTimeout(() => setTransitionDirection(0), 10); 
    }, 400); // Duration matches CSS transition speed
  };

  // Event Click Handler
  const handleDayClick = (dayData) => {
    if (dayData.hasEvents && dayData.isCurrentMonth) {
      openModal(eventsByDate[dayData.dateKey]);
    }
  };

  // Calendar Animation Class (for month transition)
  const getCalendarTransitionClass = () => {
    if (transitionDirection === 1) return 'slide-left-out';
    if (transitionDirection === -1) return 'slide-right-out';
    return '';
  };
  
  // Day names starting from Monday
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="calendar-container">
      
      <div className="calendar-card">
        
        {/* Subtle Background Glow/Gradient */}
        <div className="calendar-glow"></div>

        {/* --- Header: Month & Navigation --- */}
        <header className="calendar-header">
          <div className="calendar-title">
            {monthName(currentDate)} {currentYear}
          </div>
          <div className="calendar-nav">
            <button
              onClick={() => changeMonth(-1)}
              className="calendar-nav-button"
              aria-label="Previous month"
            >
                &lt;
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="calendar-nav-button"
              aria-label="Next month"
            >
                &gt;
            </button>
          </div>
        </header>
        
        {/* Day Names Grid */}
        <div className="calendar-day-names">
          {dayNames.map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>

        {/* Calendar Grid - Month Transition Animation */}
        <div 
          className={`calendar-grid ${getCalendarTransitionClass()}`}
        >
          {calendarDays.map((dayData) => {
            const isSelectable = dayData.isCurrentMonth && dayData.hasEvents;
            
            // Dynamic classes for visual highlighting
            let dayClasses = 'calendar-day';
            dayClasses += dayData.isCurrentMonth ? ' current-month' : ' outside-month';
            dayClasses += dayData.isToday ? ' is-today' : '';
            dayClasses += isSelectable ? ' has-events is-selectable' : '';

            return (
              <div 
                key={dayData.key}
                className={dayClasses}
                onClick={() => handleDayClick(dayData)}
                role={isSelectable ? 'button' : 'gridcell'}
                aria-label={dayData.dateKey ? `${dayData.day} ${monthName(currentDate)} ${dayData.hasEvents ? 'with events' : ''}` : undefined}
                tabIndex={isSelectable ? 0 : -1}
                onKeyDown={(e) => { 
                    if (isSelectable && (e.key === 'Enter' || e.key === ' ')) {
                        handleDayClick(dayData);
                    }
                }}
              >
                <span className="day-number">{dayData.day}</span>
                
                {/* Event Indicator Dots/Badges */}
                {dayData.hasEvents && (
                  <div className="event-indicators">
                    {eventsByDate[dayData.dateKey].slice(0, 3).map((event, index) => (
                      <div 
                        key={event.id} 
                        className={`event-dot ${event.categoryColorClass}`}
                        style={{ transform: `scale(${1 - index * 0.2})` }}
                        aria-hidden="true" 
                      ></div>
                    ))}
                  </div>
                )}
                
                {/* Today's Label for Accessibility */}
                {dayData.isToday && <span className="sr-only">(Today)</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Render the Genie Modal */}
      <EventModal 
        isAnimating={isAnimating}
        isOpen={isOpen}
        events={events}
        onClose={closeModal}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default AnimatedEventsCalendar;