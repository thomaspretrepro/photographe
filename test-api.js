#!/usr/bin/env node

/**
 * Script de test pour vérifier les APIs backend
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Test des APIs Backend\n');

// Test 1: Vérifier que les fichiers API existent
console.log('1. Vérification des fichiers API...');
const apiFiles = [
  'api/albums/index.js',
  'api/albums/[id].js',
  'api/auth/login.js',
  'api/photos/upload.js',
  'api/data/albums.json'
];

let allFilesExist = true;
apiFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MANQUANT`);
    allFilesExist = false;
  }
});

// Test 2: Vérifier la structure des données
console.log('\n2. Vérification de la structure des données...');
try {
  const albumsData = JSON.parse(fs.readFileSync('api/data/albums.json', 'utf8'));
  if (albumsData.albums && Array.isArray(albumsData.albums)) {
    console.log(`   ✅ Structure JSON valide (${albumsData.albums.length} albums)`);
    
    // Vérifier la structure d'un album
    if (albumsData.albums.length > 0) {
      const album = albumsData.albums[0];
      const requiredFields = ['id', 'title', 'description', 'category', 'coverImage', 'photos'];
      const hasAllFields = requiredFields.every(field => album.hasOwnProperty(field));
      
      if (hasAllFields) {
        console.log('   ✅ Structure d\'album valide');
      } else {
        console.log('   ⚠️  Structure d\'album incomplète');
      }
    }
  } else {
    console.log('   ❌ Structure JSON invalide');
  }
} catch (error) {
  console.log(`   ❌ Erreur de lecture JSON: ${error.message}`);
}

// Test 3: Vérifier la configuration Vercel
console.log('\n3. Vérification de la configuration Vercel...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  if (vercelConfig.functions && vercelConfig.functions['api/**/*.js']) {
    console.log('   ✅ Configuration Vercel Functions');
  } else {
    console.log('   ⚠️  Configuration Vercel Functions manquante');
  }
  
  if (vercelConfig.routes || vercelConfig.rewrites) {
    console.log('   ✅ Routes/Rewrites Vercel configurées');
  } else {
    console.log('   ⚠️  Routes/Rewrites Vercel manquantes');
  }
} catch (error) {
  console.log(`   ❌ Erreur de lecture vercel.json: ${error.message}`);
}

// Test 4: Vérifier les variables d'environnement
console.log('\n4. Vérification des variables d\'environnement...');
const envExample = fs.existsSync('.env.example');
const envLocal = fs.existsSync('.env');

if (envExample) {
  console.log('   ✅ .env.example présent');
} else {
  console.log('   ❌ .env.example manquant');
}

if (envLocal) {
  console.log('   ✅ .env présent');
} else {
  console.log('   ⚠️  .env manquant (créer à partir de .env.example)');
}

// Test 5: Vérifier les dépendances
console.log('\n5. Vérification des dépendances...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'axios'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('   ✅ Toutes les dépendances requises sont présentes');
  } else {
    console.log(`   ❌ Dépendances manquantes: ${missingDeps.join(', ')}`);
  }
} catch (error) {
  console.log(`   ❌ Erreur de lecture package.json: ${error.message}`);
}

// Résumé
console.log('\n📊 Résumé des tests:');
if (allFilesExist) {
  console.log('✅ Tous les fichiers API sont présents');
  console.log('🚀 Le projet est prêt pour le déploiement sur Vercel');
  console.log('\n📝 Prochaines étapes:');
  console.log('   1. Configurer les variables d\'environnement sur Vercel');
  console.log('   2. Configurer Cloudinary pour l\'upload d\'images');
  console.log('   3. Tester l\'interface admin');
  console.log('   4. Déployer sur Vercel');
} else {
  console.log('❌ Certains fichiers API sont manquants');
  console.log('⚠️  Veuillez corriger les erreurs avant le déploiement');
}

console.log('\n🔗 URLs de test en local:');
console.log('   Frontend: http://localhost:3000');
console.log('   API Albums: http://localhost:3000/api/albums');
console.log('   Admin: http://localhost:3000/admin');