import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import AlbumDetail from './components/pages/AlbumDetail';
import Contact from './components/pages/Contact';
import { initGA, trackPageView } from './utils/analytics';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <div className="App">
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:albumId" element={<AlbumDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// Composant 404
const NotFound = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f8f9fa',
    fontFamily: 'system-ui, sans-serif',
    textAlign: 'center'
  }}>
    <div>
      <h1 style={{ fontSize: '4rem', color: '#667eea', margin: '0 0 20px 0' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: '#6c757d', margin: '0 0 30px 0' }}>
        Page non trouvée
      </p>
      <a 
        href="/" 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}
      >
        Retour à l'accueil
      </a>
    </div>
  </div>
);

export default App;
