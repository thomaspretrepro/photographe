// ...existing code...

## 📸 Gestion des images

Les images sont hébergées sur Cloudinary pour :
- Optimisation automatique
- Redimensionnement responsive
- CDN global pour des performances optimales
- Transformations à la volée

## 🖼️ Ajouter ou mettre à jour un album de photos

Les albums sont stockés dans `src/data/albums.js`. Un script Node automatise la création et la mise à jour d'albums à partir de photos déjà uploadées sur Cloudinary.

### 1. Organiser les photos sur Cloudinary

Crée un dossier dédié sur [Cloudinary](https://cloudinary.com/console/media_library) (ex: `noel-2025/`) et uploade-y toutes les photos de l'album.

### 2. Configurer les clés API (une seule fois)

Ajoute dans `.env` (non commité) :

```env
CLOUDINARY_CLOUD_NAME=dgcpwz1u4
CLOUDINARY_API_KEY=ton_api_key
CLOUDINARY_API_SECRET=ton_api_secret
```

Ces clés sont disponibles dans **Cloudinary → Settings → API Keys**.

### 3. Générer ou mettre à jour l'album

```bash
node scripts/create-album.js <dossier-cloudinary> <id> "<titre>" "<description>" <categorie>
```

**Exemple (création) :**
```bash
node scripts/create-album.js noel-2025 noel-2025 "Noël en famille" "Souvenirs de Noël 2025" portrait
```

Le script va :
- Récupérer toutes les photos du dossier Cloudinary indiqué
- Générer le bloc JSON de l'album (id, titre, description, catégorie, photos, dates)
- L'insérer automatiquement dans `src/data/albums.js`

**Si l'`id` existe déjà**, l'album est **mis à jour** (photos remplacées, `createdAt` préservé, `updatedAt` rafraîchi) plutôt que dupliqué :

```bash
node scripts/create-album.js noel-2025 noel-2025 "Noël en famille (v2)" "Nouvelle description" portrait
```

### 4. Catégories disponibles

Voir `src/utils/constants.js` pour la liste complète (`portrait`, `landscape`, `concerts`, `essais`, ...).

### 5. Finaliser (optionnel)

Édite `src/data/albums.js` pour ajouter des titres/descriptions individuels à certaines photos si besoin.

### 6. Tester et déployer

```bash
npm run build
git add .
git commit -m "feat: ajout/màj album [nom]"
git push origin develop
```

Le `sitemap.xml` est automatiquement régénéré (via le script `prebuild`) avec le nouvel album inclus.

## 🧪 Tests

Tester les APIs localement :
```bash
node test-api.js
```

//