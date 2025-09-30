import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Home from './components/Home';
import Gallery from './components/Gallery';
import AlbumDetail from './components/AlbumDetail';
import About from './components/About';
import Contact from './components/Contact';
import Legal from './components/Legal';

// Admin Components
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AlbumForm from './components/AlbumForm';
import PhotoForm from './components/PhotoForm';
import PhotoManager from './components/PhotoManager';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already authenticated
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    setIsAdminAuthenticated(authStatus === 'true');
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAdminLogin = (status) => {
    setIsAdminAuthenticated(status);
  };

  const handleAdminLogout = (status) => {
    setIsAdminAuthenticated(status);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAdminAuthenticated ? children : <Navigate to="/admin" replace />;
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="nav-brand">
              {/* <Link to="/photographe" onClick={closeMenu}>Thomas Prêtre</Link> */}
              <a href="index.html" onClick={closeMenu}>Thomas Prêtre</a>
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
              {/* <li><Link to="/photographe" onClick={closeMenu}>Accueil</Link></li> */}
              <li><a href="index.html" onClick={closeMenu}>Accueil</a></li>
              <li><a href="gallery.html" onClick={closeMenu}>Galerie</a></li>
              <li><a href="about.html" onClick={closeMenu}>À propos</a></li>
              <li><a href="contact.html" onClick={closeMenu}>Contact</a></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/photographe" element={<Home />} /> */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:albumId" element={<AlbumDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                isAdminAuthenticated ?
                <Navigate to="/admin/dashboard" replace /> :
                <AdminLogin onLogin={handleAdminLogin} />
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard onLogout={handleAdminLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/albums/new"
              element={
                <ProtectedRoute>
                  <AlbumForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/albums/:albumId/edit"
              element={
                <ProtectedRoute>
                  <AlbumForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/photos/new"
              element={
                <ProtectedRoute>
                  <PhotoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/albums/:albumId/photos"
              element={
                <ProtectedRoute>
                  <PhotoManager />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 Thomas Prêtre Photography. Tous droits réservés.</p>
            <div className="footer-links">
              <a href="legal.html">Mentions légales</a>
              <a href="admin.html" className="admin-link">Administration</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
