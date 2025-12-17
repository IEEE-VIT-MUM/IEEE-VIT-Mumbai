// src/data/events.js

// --- Utility Functions ---

// Function to format date as YYYY-MM-DD
const getDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Helper to assign a color class cyclically
let colorIndex = 0;
const colorClasses = ['event-color-indigo', 'event-color-green', 'event-color-red', 'event-color-yellow'];
const getNextColorClass = () => {
    const colorClass = colorClasses[colorIndex % colorClasses.length];
    colorIndex++;
    return colorClass;
};

// --- Fixed Date Setup (Target Year 2026) ---

// Date format in JS: new Date(year, monthIndex, day)
// Month Index: 0 = January, 8 = September, 9 = October, 10 = November, 11 = December

const YEAR_OF_EVENTS = 2025;


// --- Event Data Structure ---

/**
 * @typedef {Object} Event
 * @property {string} id - Unique identifier.
 * @property {string} date - Date in YYYY-MM-DD format.
 * @property {string} title - Event title.
 * @property {string} description - Detailed description.
 * @property {string} time - Event time (e.g., '10:00 AM - 12:00 PM').
 * @property {string} categoryColorClass - Custom CSS class for category indicator color.
 */

/** @type {Event[]} */
export const sampleEvents = [
  // Event: IEEE Day (Oct 6, 2026)
  {
    id: 'e1',
    date: getDateString(new Date(YEAR_OF_EVENTS, 9, 6)), // Month 9 is October
    title: 'IEEE Day Celebration',
    description: 'A global celebration honoring the first time IEEE members gathered. Includes technical talks, networking, and a student competition.',
    time: '4:00 PM - 7:00 PM',
    categoryColorClass: getNextColorClass(),
  },
  
  // Event: Tech Talk Series (Sep 15, 2026)
  {
    id: 'e2',
    date: getDateString(new Date(YEAR_OF_EVENTS, 8, 15)), // Month 8 is September
    title: 'AI in Sustainable Energy Systems',
    description: 'A deep-dive technical seminar on how machine learning algorithms are optimizing grid efficiency and renewable energy adoption.',
    time: '6:30 PM - 8:30 PM',
    categoryColorClass: getNextColorClass(),
  },
  
  // Event: Student Branch Annual Meet (Sep 28, 2026)
  {
    id: 'e3',
    date: getDateString(new Date(YEAR_OF_EVENTS, 8, 28)), // Month 8 is September
    title: 'Student Branch Annual Meet',
    description: 'Reviewing the past year\'s accomplishments, electing new leadership, and planning the budget for the upcoming academic session.',
    time: '11:00 AM - 1:00 PM',
    categoryColorClass: getNextColorClass(),
  },
  
  // Event: Workshop Series (Dec 10, 2026)
  {
    id: 'e4',
    date: getDateString(new Date(YEAR_OF_EVENTS, 11, 10)), // Month 11 is December
    title: 'Advanced IoT Security Workshop',
    description: 'An all-day hands-on session focusing on threat modeling and securing embedded devices using modern cryptographic techniques.',
    time: '9:00 AM - 5:00 PM',
    categoryColorClass: getNextColorClass(),
  },
  
  // Event: Research Paper Submission Deadline (Sep 15, 2026 - Same date as e2)
  {
    id: 'e5',
    date: getDateString(new Date(YEAR_OF_EVENTS, 8, 15)), // Month 8 is September
    title: 'Research Paper Submission Deadline',
    description: 'Final deadline for submitting papers for the IEEE International Conference on Computing and Communication Technologies (ICCT).',
    time: '11:59 PM',
    categoryColorClass: getNextColorClass(),
  },

  // Event: Conference Call (Nov 20, 2026)
  {
    id: 'e6',
    date: getDateString(new Date(YEAR_OF_EVENTS, 10, 20)), // Month 10 is November
    title: 'Region 10 Planning Call',
    description: 'Bi-weekly teleconference for regional directors to coordinate upcoming large-scale chapter events and resource allocation.',
    time: '8:00 AM - 9:00 AM',
    categoryColorClass: getNextColorClass(),
  },
];