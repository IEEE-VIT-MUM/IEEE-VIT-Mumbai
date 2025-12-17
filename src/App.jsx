import './App.css'
import About_IEEE from './components/About_IEEE.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ConvenorSection from './components/ConvenorSection.jsx';
import EventsSection from './components/EventsSection.jsx';

function App() {
  return (
    <>
      <Navbar/>

      <About_IEEE/>

      <EventsSection/>

      <ConvenorSection/>

      <Footer/>
    </>
  )
}

export default App
