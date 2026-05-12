import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import AlbumDetail from './components/pages/AlbumDetail';
import Contact from './components/pages/Contact';

// Import conditionnel de l'admin
const AdminPanel = React.lazy(() => 
  process.env.REACT_APP_ADMIN === 'true' 
    ? import('./admin/components/AdminPanel')
    : Promise.reject(new Error('Admin not available'))
);

function App() {
  const isAdminMode = process.env.REACT_APP_ADMIN === 'true';

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes publiques avec layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:albumId" element={<AlbumDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Route admin (uniquement en mode admin) */}
          {isAdminMode && (
            <Route 
              path="/admin" 
              element={
                <React.Suspense fallback={<AdminLoadingFallback />}>
                  <AdminPanel />
                </React.Suspense>
              } 
            />
          )}

          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// Composant de chargement pour l'admin
const AdminLoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f8f9fa',
    fontFamily: 'system-ui, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <p style={{ color: '#6c757d', fontSize: '16px' }}>
        Chargement de l'interface d'administration...
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

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
