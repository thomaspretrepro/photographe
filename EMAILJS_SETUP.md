# Configuration EmailJS pour le Formulaire de Contact

Ce guide vous explique comment configurer EmailJS pour que le formulaire de contact envoie de vrais emails.

## 📧 Étape 1 : Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Confirmez votre email

## ⚙️ Étape 2 : Configurer un service email

1. Dans le dashboard EmailJS, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre fournisseur email :
   - **Gmail** (recommandé)
   - Outlook
   - Yahoo
   - Ou autre
4. Suivez les instructions pour connecter votre compte email
5. **Notez le Service ID** (ex: `service_abc123`) --> service_3iknb17

## 📝 Étape 3 : Créer un template d'email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template avec ces paramètres :

### Sujet du template :
```
Nouveau message de contact - Site Photo Thomas Prêtre
```

### Contenu du template :
```
Bonjour Thomas,

Vous avez reçu un nouveau message de contact depuis votre site web :

Nom : {{from_name}}
Email : {{from_email}}

Message :
{{message}}

---
Vous pouvez répondre directement à cet email.

Cordialement,
Système de contact automatique
```

### Configuration des champs :
- **To Email** : `thomas.pretre.pro@gmail.com`
- **From Name** : `{{from_name}}`
- **From Email** : `{{from_email}}`
- **Reply To** : `{{from_email}}`

4. **Notez le Template ID** (ex: `template_xyz789`) -> template_swnukir

## 🔑 Étape 4 : Obtenir la clé publique

1. Allez dans **"Account"** > **"General"**
2. Dans la section **"Public Key"**, copiez votre clé
3. **Notez la Public Key** (ex: `user_abcdefghijk`) ->AoBac3H2bkKRUfKAz

## 🛠️ Étape 5 : Configurer le code

1. Ouvrez le fichier `client/src/config/emailjs.js`
2. Remplacez les valeurs par vos vraies clés :

```javascript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'user_abcdefghijk',        // Votre vraie Public Key
  SERVICE_ID: 'service_abc123',          // Votre vraie Service ID
  TEMPLATE_ID: 'template_xyz789'         // Votre vraie Template ID
};
```

## 📦 Étape 6 : Installer les dépendances

```bash
cd client
npm install
```

## 🧪 Étape 7 : Tester le formulaire

1. Démarrez l'application :
```bash
npm start
```

2. Allez sur la page Contact
3. Remplissez et envoyez le formulaire
4. Vérifiez votre boîte email `thomas.pretre.pro@gmail.com`

## ✅ Vérifications

### Si ça fonctionne :
- ✅ Message de succès affiché
- ✅ Email reçu dans votre boîte
- ✅ Formulaire réinitialisé

### Si ça ne fonctionne pas :
- ❌ Vérifiez les clés dans `emailjs.js`
- ❌ Vérifiez la console du navigateur pour les erreurs
- ❌ Vérifiez que le service EmailJS est actif
- ❌ Vérifiez les spams de votre boîte email

## 🔧 Dépannage

### Erreur "Invalid"
- Vérifiez que toutes les clés sont correctes
- Vérifiez que le service EmailJS est actif

### Erreur "Rate limit"
- EmailJS limite à 200 emails/mois en gratuit
- Attendez quelques minutes entre les tests

### Email non reçu
- Vérifiez les spams
- Vérifiez l'adresse email dans le template
- Testez avec un autre email

## 💰 Limites du plan gratuit

- **200 emails/mois**
- **2 services email**
- **3 templates**

Pour plus d'emails, passez au plan payant sur EmailJS.

## 🔒 Sécurité

- Les clés EmailJS sont publiques (côté client)
- Configurez des restrictions de domaine dans EmailJS
- Surveillez l'usage pour éviter les abus

---

Une fois configuré, le formulaire enverra de vrais emails à `thomas.pretre.pro@gmail.com` ! 🎉