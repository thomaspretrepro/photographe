#!/bin/bash

# 🚀 Script de Déploiement en Production
# Usage: ./deploy-production.sh

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${RED}🚨 DÉPLOIEMENT EN PRODUCTION 🚨${NC}"
echo "======================================="
echo ""
echo -e "${YELLOW}⚠️  ATTENTION: Vous allez déployer en PRODUCTION${NC}"
echo -e "${YELLOW}   Assurez-vous d'avoir testé en préprod avant !${NC}"
echo ""

# Demander confirmation
read -p "Êtes-vous sûr de vouloir déployer en production ? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}❌ Déploiement annulé${NC}"
    exit 1
fi

# Vérifier que la branche staging existe
if ! git show-ref --verify --quiet refs/heads/staging; then
    echo -e "${RED}❌ La branche staging n'existe pas${NC}"
    echo "Veuillez d'abord déployer en préprod avec ./deploy-staging.sh"
    exit 1
fi

# Aller sur main
echo -e "${BLUE}📦 Passage sur la branche main...${NC}"
git checkout main

# Fusionner staging
echo -e "${BLUE}🔄 Fusion de staging vers main...${NC}"
git merge staging --no-edit

# Pousser vers main (déploiement automatique en production)
echo -e "${BLUE}☁️  Push vers main (PRODUCTION)...${NC}"
git push origin main

# Retourner sur la branche de développement
git checkout clean-version-without-admin

echo ""
echo -e "${GREEN}✅ Déploiement en PRODUCTION terminé !${NC}"
echo ""
echo -e "${YELLOW}🔗 Votre site est maintenant en ligne :${NC}"
echo "https://photographe.vercel.app"
echo ""
echo -e "${BLUE}📋 Vérifications recommandées :${NC}"
echo "1. Tester le site en production"
echo "2. Vérifier que toutes les pages fonctionnent"
echo "3. Tester sur mobile et desktop"
echo ""
echo -e "${YELLOW}🔄 En cas de problème, rollback avec :${NC}"
echo "git checkout main && git reset --hard HEAD~1 && git push --force origin main"
echo ""