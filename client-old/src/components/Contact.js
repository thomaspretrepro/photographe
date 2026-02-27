import React, { useState, useEffect } from 'react';
import { EMAILJS_CONFIG } from '../config/emailjs';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [emailjsReady, setEmailjsReady] = useState(false);

  useEffect(() => {
    // Initialiser EmailJS quand le composant se charge
    const initEmailJS = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        setEmailjsReady(true);
        console.log('EmailJS initialisé avec succès');
      } else {
        // Réessayer dans 100ms si EmailJS n'est pas encore chargé
        setTimeout(initEmailJS, 100);
      }
    };

    initEmailJS();
  }, []);

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

    if (!emailjsReady || !window.emailjs) {
      setSubmitMessage('❌ EmailJS n\'est pas encore chargé. Veuillez réessayer dans quelques secondes.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Préparation des paramètres pour EmailJS - AVEC EMAIL DESTINATAIRE
      const templateParams = {
        user_name: `${formData.prenom} ${formData.nom}`,
        user_email: formData.email,
        message: formData.message,
        to_email: 'thomas.pretre.pro@gmail.com'  // Email de destination
      };

      console.log('Envoi EmailJS:', templateParams);

      // Envoi via EmailJS avec gestion d'erreur détaillée
      const response = await window.emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email envoyé avec succès:', response);
      setSubmitMessage('✅ Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
      setFormData({ nom: '', prenom: '', email: '', message: '' });

    } catch (error) {
      console.error('Erreur EmailJS complète:', error);
      console.error('Status:', error.status);
      console.error('Text:', error.text);
      
      // Messages d'erreur spécifiques pour 422
      let errorMessage = 'Une erreur est survenue lors de l\'envoi.';
      
      if (error.status === 422) {
        errorMessage = `Erreur de template EmailJS (422). Vérifiez que votre template contient les variables : user_name, user_email, message. 
        
Votre template doit ressembler à :
Nom: {{user_name}}
Email: {{user_email}}
Message: {{message}}`;
      } else if (error.status === 400) {
        errorMessage = 'Erreur de configuration EmailJS (400). Vérifiez vos clés.';
      } else if (error.status === 402) {
        errorMessage = 'Limite d\'emails atteinte (402). Contactez-moi directement à thomas.pretre.pro@gmail.com';
      } else if (error.text && error.text.includes('rate limit')) {
        errorMessage = 'Trop de tentatives. Veuillez attendre quelques minutes.';
      } else if (error.text && error.text.includes('Invalid')) {
        errorMessage = 'Configuration EmailJS invalide. Vérifiez vos clés.';
      }
      
      setSubmitMessage(`❌ ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>Contact</h1>
          <p>Parlons de votre projet photo</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Restons en contact</h2>
            <p>
              Vous avez un projet photo en tête ? Une séance portrait, un événement à immortaliser, 
              ou simplement envie de discuter photographie ? N'hésitez pas à me contacter !
            </p>
            
            {/* <div className="contact-details">
              <div className="contact-item">
                <h3>Email</h3>
                <p>thomas.pretre.pro@gmail.com</p>
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
              
              <div className="contact-item">
                <h3>Temps de réponse</h3>
                <p>Je réponds généralement sous 24h</p>
              </div>
            </div> */}
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
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
                className="submit-btn"
                disabled={isSubmitting || !emailjsReady}
              >
                {isSubmitting ? 'Envoi en cours...' : 
                 !emailjsReady ? 'Chargement...' : 'Envoyer le message'}
              </button>

              {submitMessage && (
                <div className={`submit-message ${
                  submitMessage.includes('✅') ? 'success' : 
                  submitMessage.includes('⚠️') ? 'warning' : 'error'
                }`} style={{ whiteSpace: 'pre-line' }}>
                  {submitMessage}
                </div>
              )}

              {/* Indicateur de statut EmailJS pour debug */}
              {/* <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
                EmailJS: {emailjsReady ? '✅ Prêt' : '⏳ Chargement...'}
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;