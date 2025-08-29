import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>À propos</h1>
          <p>Découvrez mon univers photographique</p>
        </div>

        <div className="about-content">
          <div className="about-intro">
            <div className="about-image">
              <img 
                src="https://res.cloudinary.com/dgcpwz1u4/image/upload/v1752831346/_DSC0660_eea9yl.jpg" 
                alt="Thomas Prêtre" 
              />
            </div>
            <div className="about-text">
              <h2>Thomas Prêtre</h2>
              <h3>Photographe Passionné</h3>
              <p>
                Bonjour ! Je suis Thomas, photographe basé en Oise. 
                Depuis quelques années, je capture les émotions et les instants précieux 
                à travers mon objectif. Ma passion pour la photographie a commencé très tôt, 
                et elle ne cesse de grandir chaque jour.
              </p>
              <p>
                Chaque image que je crée raconte une histoire unique. Que ce soit un portrait 
                intime, un paysage grandiose ou un concert je m'efforce de 
                révéler la beauté et l'authenticité de chaque sujet.
              </p>
            </div>
          </div>

          <div className="about-philosophy">
            <h2>Ma Philosophie</h2>
            <div className="philosophy-grid">
              <div className="philosophy-item">
                <h3>Authenticité</h3>
                <p>
                  Je privilégie les moments naturels et spontanés, capturant 
                  l'essence véritable de mes sujets sans artifice.
                </p>
              </div>
              <div className="philosophy-item">
                <h3>Émotion</h3>
                <p>
                  Chaque cliché doit transmettre une émotion, raconter une histoire 
                  et créer une connexion avec celui qui la regarde.
                </p>
              </div>
              <div className="philosophy-item">
                <h3>Excellence</h3>
                <p>
                  Je m'engage à fournir un travail de la plus haute qualité,
                  avec une attention particulière aux détails.
                </p>
              </div>
              <div className="philosophy-item">
                <h3>Communication</h3>
                <p>
                  L'écoute active est au cœur de mon approche. Je prends le temps
                  de comprendre vos attentes, vos goûts et votre vision pour créer
                  des images qui vous ressemblent et vous plaisent vraiment.
                  Chaque séance devient ainsi une expérience agréable et collaborative.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="about-services">
            <h2>Mes Services</h2>
            <div className="services-grid">
              <div className="service-item">
                <h3>Portraits</h3>
                <p>
                  Portraits professionnels, familiaux ou artistiques. 
                  Je révèle la personnalité unique de chaque personne.
                </p>
                <ul>
                  <li>Portraits corporate</li>
                  <li>Portraits de famille</li>
                  <li>Portraits artistiques</li>
                  <li>Séances lifestyle</li>
                </ul>
              </div>
              <div className="service-item">
                <h3>Événements</h3>
                <p>
                  Immortalisation de vos moments précieux avec discrétion 
                  et professionnalisme.
                </p>
                <ul>
                  <li>Mariages</li>
                  <li>Événements d'entreprise</li>
                  <li>Célébrations familiales</li>
                  <li>Conférences et séminaires</li>
                </ul>
              </div>
              <div className="service-item">
                <h3>Paysages</h3>
                <p>
                  Capture de la beauté naturelle et urbaine, 
                  révélant la magie de chaque lieu.
                </p>
                <ul>
                  <li>Paysages naturels</li>
                  <li>Architecture</li>
                  <li>Photographie urbaine</li>
                  <li>Voyages et découvertes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="about-experience">
            <h2>Mon Parcours</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">2024</div>
                <div className="timeline-content">
                  <h3>Expansion Internationale</h3>
                  <p>Collaboration avec des clients européens et développement de projets artistiques personnels.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2020</div>
                <div className="timeline-content">
                  <h3>Studio Professionnel</h3>
                  <p>Ouverture de mon studio professionnel et spécialisation dans les portraits corporate.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2015</div>
                <div className="timeline-content">
                  <h3>Photographe Indépendant</h3>
                  <p>Lancement de mon activité de photographe professionnel indépendant.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2012</div>
                <div className="timeline-content">
                  <h3>Formation Professionnelle</h3>
                  <p>Diplôme en photographie professionnelle et premiers projets commerciaux.</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="about-cta">
            <h2>Travaillons Ensemble</h2>
            <p>
              Vous avez un projet en tête ? Je serais ravi de discuter avec vous 
              et de donner vie à vos idées à travers mes images.
            </p>
            <a href="/contact" className="cta-button">
              Contactez-moi
            </a>
          </div> */}
        </div>
      </div>

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

export default About;