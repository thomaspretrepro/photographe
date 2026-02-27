import React, { useState } from 'react';
import { APP_CONFIG } from '../../utils/constants';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // TODO: Implémenter l'envoi d'email (EmailJS ou API)
      // Simulation pour le moment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('✅ Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('❌ Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h1>Contact</h1>
          <p>Parlons de votre projet photo</p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Restons en contact</h2>
            <p>
              Vous avez un projet photo en tête ? Une séance portrait, un événement à immortaliser, 
              ou simplement envie de discuter photographie ? N'hésitez pas à me contacter !
            </p>
            
            <div className="contact-details">
              {/* <div className="contact-item">
                <h3>Email</h3>
                <a href={`mailto:${APP_CONFIG.email}`}>
                  {APP_CONFIG.email}
                </a>
              </div> */}
              
              <div className="contact-item">
                <h3>Instagram</h3>
                <a 
                  href={APP_CONFIG.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  @tom_p_pics
                </a>
              </div>
              
              <div className="contact-item">
                <h3>Spécialités</h3>
                <ul>
                  <li>Portraits professionnels</li>
                  <li>Photographie d'événements</li>
                  <li>Paysages et nature</li>
                  <li>Séances photo personnalisées</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, vos besoins, ou posez-moi vos questions..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {submitMessage && (
                <div className={`submit-message ${
                  submitMessage.includes('✅') ? 'success' : 'error'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;