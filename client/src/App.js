import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Components
import Home from './components/Home';
import Gallery from './components/Gallery';
import AlbumDetail from './components/AlbumDetail';
import About from './components/About';
import Contact from './components/Contact';
import Legal from './components/Legal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="nav-brand">
              <Link to="/" onClick={closeMenu}>Thomas Prêtre</Link>
            </div>
            <button
              className="hamburger-menu"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            </button>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
              <li><Link to="/gallery" onClick={closeMenu}>Galerie</Link></li>
              <li><Link to="/about" onClick={closeMenu}>À propos</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:albumId" element={<AlbumDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 Thomas Prêtre Photography. Tous droits réservés.</p>
            <Link to="/legal">Mentions légales</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;