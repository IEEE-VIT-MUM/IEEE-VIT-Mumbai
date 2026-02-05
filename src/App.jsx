import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AboutPage from './components/About_page';
// Import the new Home component we will create
import Home from './components/Home.jsx'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<Home />} />
        
        {/* Separate About Page Route */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;