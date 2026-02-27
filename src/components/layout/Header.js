import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_CONFIG } from '../../utils/constants';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            {/* Logo/Brand */}
            <div className="nav-brand">
              <Link to="/" onClick={closeMenu}>
                {APP_CONFIG.photographer}
              </Link>
            </div>

            {/* Hamburger Menu Button */}
            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* Navigation Menu */}
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/gallery" 
                  className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Galerie
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Overlay pour fermer le menu mobile */}
      {isMenuOpen && (
        <div className="nav-overlay" onClick={closeMenu}></div>
      )}
    </header>
  );
};

export default Header;