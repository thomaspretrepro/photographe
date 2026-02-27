// Configuration EmailJS
// IMPORTANT: Remplacez ces valeurs par vos vraies clés EmailJS

export const EMAILJS_CONFIG = {
  // Votre Public Key EmailJS (à obtenir sur https://www.emailjs.com/)
  PUBLIC_KEY: 'AoBac3H2bkKRUfKAz',
  
  // Votre Service ID (configuré dans EmailJS)
  SERVICE_ID: 'service_3iknb17',
  
  // Votre Template ID (configuré dans EmailJS)
  TEMPLATE_ID: 'template_v628gxm'
};

// Template de variables pour EmailJS
// Ces noms doivent correspondre à votre template EmailJS
export const EMAIL_TEMPLATE_PARAMS = {
  from_name: '{{from_name}}',      // Nom complet du contact
  from_email: '{{from_email}}',    // Email du contact
  message: '{{message}}',          // Message du contact
  to_email: 'thomas.pretre.pro@gmail.com', // Votre email de destination
  reply_to: '{{from_email}}'       // Pour pouvoir répondre directement
};

/*
INSTRUCTIONS DE CONFIGURATION :

1. Créez un compte sur https://www.emailjs.com/
2. Configurez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email avec ces variables :
   - {{from_name}} : Nom de l'expéditeur
   - {{from_email}} : Email de l'expéditeur  
   - {{message}} : Message du contact
   - {{to_email}} : Votre email (thomas.pretre.pro@gmail.com)
   - {{reply_to}} : Email pour répondre

4. Remplacez les valeurs YOUR_EMAILJS_* par vos vraies clés

Exemple de template EmailJS :
---
Sujet: Nouveau message de contact - Site Photo Thomas Prêtre

Bonjour Thomas,

Vous avez reçu un nouveau message de contact depuis votre site web :

Nom : {{from_name}}
Email : {{from_email}}

Message :
{{message}}

---
Vous pouvez répondre directement à cet email.
---
*/