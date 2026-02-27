import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../utils/constants';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Photos pour le slider principal
  const heroSlides = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288586/IMG_3656_g2glww.jpg",
      title: "Nature Morte",
      category: "essais",
      albumId: "essais-devoirs"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756308038/_MG_0511-min_mw7dnn.jpg",
      title: "Falaises d'étretat",
      category: "landscape",
      albumId: "etretat"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288469/_MG_4694_suin7j.jpg",
      title: "Clara, rêverie au jardin",
      category: "portraits",
      albumId: "portraits-clara"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756289027/_MG_2507-Enhanced-NR-2_faldyq.jpg",
      title: "Ankor au petit bain",
      category: "concerts",
      albumId: "concert-ankor"
    }
  ];

  // Auto-slide toutes les 5 secondes (pause au survol)
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home">
      {/* Hero Section avec Slider */}
      <section
        className="hero-slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="slider-container">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="slide-image"
              />
              <div className="slide-overlay">
                {/* Réseaux sociaux */}
                <div className="social-links">
                  <a href={APP_CONFIG.instagram} aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="slide-info">
                  <h3>{slide.title}</h3>
                  <p>{slide.category}</p>
                  <Link to={`/gallery/${slide.albumId}`} className="view-project-btn">
                    VOIR LE PROJET
                  </Link>
                </div>

                {/* Navigation du slider */}
                <div className="slider-nav">
                  <button className="nav-btn prev" onClick={prevSlide}>
                    ‹
                  </button>
                  <div className="slide-indicators">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                      />
                    ))}
                  </div>
                  <button className="nav-btn next" onClick={nextSlide}>
                    ›
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Capturer l'instant, révéler l'émotion</h2>
              <p>
                Photographe passionné depuis plus de 5 ans, je transforme chaque moment 
                en une œuvre d'art visuelle. Mon approche combine technique moderne 
                et sensibilité artistique pour créer des images qui racontent votre histoire.
              </p>
              <div className="stats">
                <div className="stat">
                  <span className="number">10+</span>
                  <span className="label">Projets réalisés</span>
                </div>
                <div className="stat">
                  <span className="number">5</span>
                  <span className="label">Années d'expérience</span>
                </div>
                <div className="stat">
                  <span className="number">100%</span>
                  <span className="label">Clients satisfaits</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img 
                src="https://res.cloudinary.com/dgcpwz1u4/image/upload/v1752831346/_DSC0660_eea9yl.jpg" 
                alt="Thomas Prêtre" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à créer quelque chose d'extraordinaire ?</h2>
            <p>Contactez-moi pour discuter de votre projet photo</p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Commencer un projet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;