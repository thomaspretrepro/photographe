# 🔧 Correction Template EmailJS - Erreur 422

## ❌ **Problème actuel :**
Votre template EmailJS ne contient pas les bonnes variables, ce qui cause l'erreur 422.

## ✅ **Solution :**

### **1. Connectez-vous à EmailJS :**
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Connectez-vous à votre compte

### **2. Modifiez votre template :**
- Allez dans **Email Templates**
- Trouvez votre template `template_v628gxm`
- Cliquez sur **Edit**

### **3. Remplacez TOUT le contenu par :**

```
Nouveau message de contact - Site Photo Thomas Prêtre

Bonjour Thomas,

Vous avez reçu un nouveau message de contact depuis votre site :

Nom: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Cordialement,
Système de contact automatique
```

### **4. Variables obligatoires :**
Votre template DOIT contenir exactement ces variables :
- `{{user_name}}`
- `{{user_email}}`
- `{{message}}`

### **5. Sauvegardez :**
- Cliquez sur **Save**
- Testez le template avec **Test**

## 🎯 **Après correction :**
- Retournez sur votre site
- Remplissez le formulaire de contact
- Cliquez sur "Envoyer"
- ✅ Le message devrait s'envoyer sans erreur !

## 📧 **Configuration Email :**
- **Service ID :** `service_3iknb17`
- **Template ID :** `template_v628gxm`
- **Public Key :** `AoBac3H2bkKRUfKAz`

---
**Note :** L'erreur 422 disparaîtra dès que votre template contiendra les bonnes variables.