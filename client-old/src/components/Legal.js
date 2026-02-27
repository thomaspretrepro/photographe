import React from 'react';
import './Legal.css';

const Legal = () => {
  return (
    <div className="legal">
      <div className="container">
        <div className="legal-header">
          <h1>Mentions Légales</h1>
          <p>Informations légales obligatoires</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Informations sur l'éditeur du site</h2>
            <div className="legal-info">
              <p><strong>Nom :</strong> Thomas Prêtre</p>
              <p><strong>Statut :</strong> Photographe professionnel - Auto-entrepreneur</p>
              {/* <p><strong>SIRET :</strong> [À compléter]</p>
              <p><strong>Adresse :</strong> [À compléter]</p>
              <p><strong>Téléphone :</strong> [À compléter]</p> */}
              <p><strong>Email :</strong> thomas.pretre.pro@gmail.com</p>
              <p><strong>Directeur de la publication :</strong> Thomas Prêtre</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>2. Hébergement</h2>
            <div className="legal-info">
              <p><strong>Hébergeur :</strong> github.com</p>
              {/* <p><strong>Adresse :</strong> [À compléter]</p>
              <p><strong>Téléphone :</strong> [À compléter]</p> */}
            </div>
          </section>

          <section className="legal-section">
            <h2>3. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale 
              sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
              reproduction sont réservés, y compris pour les documents téléchargeables 
              et les représentations iconographiques et photographiques.
            </p>
            <p>
              Les photographies présentes sur ce site sont la propriété exclusive de 
              Thomas Prêtre. Toute reproduction, même partielle, est interdite sans 
              autorisation écrite préalable.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Protection des données personnelles (RGPD)</h2>
            <h3>4.1 Responsable du traitement</h3>
            <p>
              Thomas Prêtre, en sa qualité de photographe professionnel, est responsable 
              du traitement des données personnelles collectées sur ce site.
            </p>

            <h3>4.2 Données collectées</h3>
            <p>Les données personnelles collectées via le formulaire de contact sont :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Message</li>
            </ul>

            <h3>4.3 Finalité du traitement</h3>
            <p>
              Ces données sont collectées dans le seul but de répondre à vos demandes 
              de contact et de devis. Elles ne sont en aucun cas transmises à des tiers.
            </p>

            <h3>4.4 Durée de conservation</h3>
            <p>
              Les données sont conservées pendant une durée de 3 ans maximum à compter 
              de la dernière prise de contact.
            </p>

            <h3>4.5 Vos droits</h3>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), 
              vous disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse : 
              thomas.pretre.pro@gmail.com
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Cookies</h2>
            <p>
              Ce site n'utilise pas de cookies de tracking ou de publicité. 
              Seuls des cookies techniques nécessaires au bon fonctionnement 
              du site peuvent être utilisés.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Limitation de responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que possible 
              et le site remis à jour à différentes périodes de l'année, mais peut 
              toutefois contenir des inexactitudes ou des omissions.
            </p>
            <p>
              Si vous constatez une lacune, erreur ou ce qui parait être un 
              dysfonctionnement, merci de bien vouloir le signaler par email, 
              à l'adresse thomas.pretre.pro@gmail.com, en décrivant le problème 
              de la manière la plus précise possible.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Droit applicable et attribution de juridiction</h2>
            <p>
              Tout litige en relation avec l'utilisation du site 
              www.thomaspretre-photo.fr est soumis au droit français. 
              Il est fait attribution exclusive de juridiction aux tribunaux 
              compétents de [Ville à compléter].
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Liens hypertextes</h2>
            <p>
              Les sites internet peuvent proposer des liens vers d'autres sites 
              internet ou d'autres ressources disponibles sur Internet. 
              Thomas Prêtre ne dispose d'aucun moyen pour contrôler les sites 
              en connexion avec son site internet.
            </p>
            <p>
              Thomas Prêtre ne répond pas de la disponibilité de tels sites et 
              sources externes, ni ne la garantit. Il ne peut être tenu pour 
              responsable de tout dommage, de quelque nature que ce soit, 
              résultant du contenu de ces sites ou sources externes.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales, vous pouvez 
              nous contacter à l'adresse email : thomas.pretre.pro@gmail.com
            </p>
          </section>

          <div className="legal-footer">
            <p><em>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
