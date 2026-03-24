import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from "./components/ScrollToTop";

import TeamPage from './components/TeamSection.jsx';
import AboutPage from './components/About_page';
import Home from './components/Home.jsx'; 

function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <Navbar />

      {/* Main wrapper to offset fixed navbar */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
