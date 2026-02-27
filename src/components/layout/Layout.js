import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Ajouter une classe au body pour le padding-top du header fixe
  useEffect(() => {
    if (!isHomePage) {
      document.body.classList.add('has-fixed-header');
    } else {
      document.body.classList.remove('has-fixed-header');
    }
    
    return () => {
      document.body.classList.remove('has-fixed-header');
    };
  }, [isHomePage]);

  return (
    <div className={`layout ${isHomePage ? 'home-layout' : ''}`}>
      <Header />
      <main className={`main-content ${isHomePage ? 'home-main' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;