import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import AlbumDetail from './components/pages/AlbumDetail';
import Contact from './components/pages/Contact';

function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;