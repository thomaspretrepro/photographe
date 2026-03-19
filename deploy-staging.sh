#!/bin/bash

# 🚀 Script de Déploiement en Préprod
# Usage: ./deploy-staging.sh "message de commit"

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Déploiement en Préprod${NC}"
echo "=================================="

# Vérifier qu'on est sur la bonne branche
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "clean-version-without-admin" ]; then
    echo -e "${YELLOW}⚠️  Vous n'êtes pas sur la branche clean-version-without-admin${NC}"
    echo -e "${YELLOW}   Branche actuelle: $CURRENT_BRANCH${NC}"
    read -p "Continuer quand même ? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Vérifier s'il y a des changements non commités
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Vous avez des changements non commités${NC}"
    if [ -n "$1" ]; then
        echo -e "${BLUE}📝 Commit automatique avec le message: $1${NC}"
        git add .
        git commit --no-gpg-sign -m "$1"
    else
        echo -e "${RED}❌ Veuillez commiter vos changements ou fournir un message de commit${NC}"
        echo "Usage: ./deploy-staging.sh \"votre message de commit\""
        exit 1
    fi
fi

# Aller sur staging
echo -e "${BLUE}📦 Passage sur la branche staging...${NC}"
if git show-ref --verify --quiet refs/heads/staging; then
    git checkout staging
else
    echo -e "${BLUE}🆕 Création de la branche staging...${NC}"
    git checkout -b staging
fi

# Fusionner les changements
echo -e "${BLUE}🔄 Fusion des changements...${NC}"
git merge clean-version-without-admin --no-edit

# Pousser vers staging
echo -e "${BLUE}☁️  Push vers staging...${NC}"
git push origin staging

# Retourner sur la branche de développement
git checkout clean-version-without-admin

echo ""
echo -e "${GREEN}✅ Déploiement en préprod terminé !${NC}"
echo ""
echo -e "${YELLOW}🔗 Pour voir votre site en préprod :${NC}"
echo "1. Aller sur https://vercel.com/dashboard"
echo "2. Cliquer sur votre projet 'photographe'"
echo "3. Onglet 'Deployments'"
echo "4. Chercher le déploiement 'staging' et cliquer sur l'URL"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo "1. Tester votre site en préprod"
echo "2. Si tout est OK, déployer en production avec:"
echo "   git checkout main && git merge staging && git push origin main"
echo ""