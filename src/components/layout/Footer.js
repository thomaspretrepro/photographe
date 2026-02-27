import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../utils/constants';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="footer-main">
            <div className="footer-brand">
              <h3>{APP_CONFIG.photographer}</h3>
              <p>{APP_CONFIG.description}</p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Navigation</h4>
                <ul>
                  <li><Link to="/">Accueil</Link></li>
                  <li><Link to="/gallery">Galerie</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Contact</h4>
                <ul>
                  <li>
                    <a href={`mailto:${APP_CONFIG.email}`}>
                      {APP_CONFIG.email}
                    </a>
                  </li>
                  <li>
                    <a 
                      href={APP_CONFIG.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>
                &copy; {currentYear} {APP_CONFIG.photographer}. 
                Tous droits réservés.
              </p>
            </div>
            
            <div className="footer-admin">
              <Link to="/admin" className="admin-link">
                Administration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;