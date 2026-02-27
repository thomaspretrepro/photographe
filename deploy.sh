#!/bin/bash

# Script de déploiement rapide sur Vercel
echo "🚀 Déploiement du projet photographe sur Vercel"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
fi

# Build du projet
echo "🔨 Build du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi"
    
    # Déploiement
    echo "🚀 Déploiement sur Vercel..."
    vercel --prod
    
    echo ""
    echo "🎉 Déploiement terminé !"
    echo ""
    echo "📋 Prochaines étapes :"
    echo "1. Configurer les variables d'environnement sur Vercel"
    echo "2. Configurer Cloudinary"
    echo "3. Tester le site en production"
    echo ""
    echo "📖 Voir DEPLOYMENT-GUIDE.md pour les détails"
else
    echo "❌ Erreur lors du build"
    exit 1
fi