import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Photos pour le slider principal
  const heroSlides = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dgcpwz1u4/image/upload/v1752831346/_DSC0660_eea9yl.jpg",
      title: "Portrait Élégant",
      category: "Portraits"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Paysage Majestueux",
      category: "Paysages"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "Moments Précieux",
      category: "Événements"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756208507/_MG_5620-2_nfdchj.jpg",
      title: "Expression Naturelle",
      category: "Portraits"
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
                {/* <div className="hero-content">
                  <h1 className="photographer-name">THOMAS PRÊTRE</h1>
                  <p className="photographer-title">PHOTOGRAPHE</p>
                </div> */}
                
                <div className="slide-info">
                  <h3>{slide.title}</h3>
                  <p>{slide.category}</p>
                  <Link to="/gallery" className="view-project-btn">
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

                {/* Réseaux sociaux */}
                <div className="social-links">
                  {/* <a href="#" aria-label="Facebook">FB</a> */}
                  <a href="https://www.instagram.com/tom_p_pics/" aria-label="Instagram">IN</a>
                  {/* <a href="#" aria-label="Twitter">TW</a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section À propos minimaliste */}
      <section className="about-minimal">
        <div className="container">
          <div className="about-content-minimal">
            <div className="about-text-minimal">
              <h2>Capturer l'instant, révéler l'émotion</h2>
              <p>
                Photographe passionné depuis plus de 10 ans, je transforme chaque moment 
                en une œuvre d'art visuelle. Mon approche combine technique professionnelle 
                et sensibilité artistique pour créer des images qui racontent votre histoire.
              </p>
              <div className="stats">
                <div className="stat">
                  <span className="number">500+</span>
                  <span className="label">Projets réalisés</span>
                </div>
                <div className="stat">
                  <span className="number">10+</span>
                  <span className="label">Années d'expérience</span>
                </div>
                <div className="stat">
                  <span className="number">100%</span>
                  <span className="label">Clients satisfaits</span>
                </div>
              </div>
              <Link to="/about" className="learn-more-btn">
                EN SAVOIR PLUS
              </Link>
            </div>
            <div className="about-image-minimal">
              <img 
                src="https://res.cloudinary.com/dgcpwz1u4/image/upload/v1752831346/_DSC0660_eea9yl.jpg" 
                alt="Thomas Prêtre Photographe" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      {/* <section className="services-preview">
        <div className="container">
          <h2>Mes Spécialités</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📸</div>
              <h3>Portraits</h3>
              <p>Révélez votre personnalité unique</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🌄</div>
              <h3>Paysages</h3>
              <p>La beauté naturelle capturée</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💒</div>
              <h3>Événements</h3>
              <p>Vos moments précieux immortalisés</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à créer quelque chose d'extraordinaire ?</h2>
            <p>Contactez-moi pour discuter de votre projet photo</p>
            <Link to="/contact" className="cta-button-large">
              COMMENCER UN PROJET
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;