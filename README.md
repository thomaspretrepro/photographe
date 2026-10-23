# 📸 Site Photographe — Thomas Prêtre

Site vitrine statique (React / Create React App) hébergé sur Vercel. Les photos sont stockées sur Cloudinary et référencées dans `src/data/albums.js`. Pas de backend, pas de base de données.

- **Production** : https://thomaspretre.fr (branche `main`)
- **Préprod** : URL Preview Vercel (branche `develop`)

## 🧱 Stack

- React 18, React Router 6
- `react-helmet-async` : titre et meta tags (SEO / Open Graph) par page
- `react-ga4` : Google Analytics 4
- Cloudinary : hébergement des images
- Vercel : déploiement

## 📁 Structure

```
src/
  App.js                  routes + tracking Analytics
  components/layout/      Header, Footer, Layout
  components/pages/       Home, Gallery, AlbumDetail, Contact
  data/albums.js          données des albums (source de vérité)
  utils/                  analytics.js, constants.js
scripts/
  create-album.js         import d'un album depuis Cloudinary
  generate-sitemap.js     génération de public/sitemap.xml
public/                   index.html, robots.txt, sitemap.xml, icônes
```

## 🚀 Démarrage

```bash
npm install
cp .env.example .env     # puis renseigner les valeurs
npm start                # http://localhost:3000
```

### Commandes

| Commande | Rôle |
|---|---|
| `npm start` | Serveur de développement |
| `npm run build` | Build de production (régénère d'abord le sitemap via `prebuild`) |
| `npm run generate-sitemap` | Régénère `public/sitemap.xml` seul |
| `npm run create-album -- <args>` | Crée ou met à jour un album (voir plus bas) |

> Les commandes se lancent à la **racine** du projet (il n'y a pas de dossier `client`).

## 🔐 Variables d'environnement

Voir `.env.example`. Les fichiers `.env` et `.env.local` ne sont jamais commités.

| Variable | Usage |
|---|---|
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Script `create-album` uniquement (Node). **Ne jamais** préfixer par `REACT_APP_` : ces valeurs finiraient dans le bundle public. |
| `REACT_APP_GA_MEASUREMENT_ID` | ID Google Analytics 4 (`G-XXXXXXXXXX`). Pas un secret. À définir aussi sur Vercel (Production et Preview). |
| `REACT_APP_EMAILJS_*` | Formulaire de contact (optionnel) |
| `REACT_APP_INSTAGRAM_ACCESS_TOKEN` | Flux Instagram (optionnel, voir `INSTAGRAM-SETUP.md`) |

### Registre npm (`.npmrc`)

Le fichier `.npmrc` force le registre public (`registry=https://registry.npmjs.org/`). Il est **indispensable** : sans lui, une config npm globale pointant vers un registre d'entreprise se retrouve dans `package-lock.json`, et le build Vercel échoue (`ENOTFOUND`). À recopier dans chaque projet perso.

## 🌳 Workflow Git et déploiement

| Branche | Rôle | Déploiement Vercel |
|---|---|---|
| `develop` | Développement quotidien | **Preview** automatique à chaque push |
| `main` | Production | **Production** automatique à chaque merge |

⚠️ **On ne travaille jamais directement sur `main`.**

### Au quotidien

```bash
git checkout develop
git pull origin develop
# ... modifications, tests avec npm start / npm run build ...
git add .
git commit -m "feat: description"
git push origin develop
```

Vercel déploie une Preview (Dashboard → Deployments, URL du type `photographe-git-develop-xxx.vercel.app`). Vérifier :

- [ ] Accueil, galerie, albums, contact sans erreur
- [ ] Chaque bouton « VOIR LE PROJET » du slider mène au bon album
- [ ] Mobile et desktop
- [ ] Google Analytics → Temps réel : les visites remontent

### Passage en production

1. GitHub → **Pull Requests** → nouvelle PR `develop` → `main`
2. Relire le diff, puis **Merge**
3. Vercel déploie automatiquement en Production

Ne pas faire `git merge` en local sur `main`.

### Configuration Vercel (une fois)

Settings → Git : **Production Branch** = `main`. Les autres branches (`develop`) sont en Preview.

### Rollback

Vercel → Deployments → choisir un ancien déploiement → **Promote to Production** / **Instant Rollback**. Éviter `git push --force` sur `main`.

### Commits

`feat:` nouveauté · `fix:` correction · `docs:` documentation · `style:` mise en forme · `refactor:` refonte · `chore:` dépendances, config

## 🖼️ Albums

Les albums sont dans `src/data/albums.js` (`albumsData`). Chaque album a : `id`, `title`, `description`, `category`, `coverImage`, `photos[]`, `createdAt`, `updatedAt`, et optionnellement `eventDate` et `displayOrder`.

### Ajouter ou mettre à jour un album

1. **Cloudinary** : créer un dossier par album (ex. `noel-2025`) et y mettre les photos.
2. **Clés API** dans `.env` (Cloudinary → Settings → API Keys).
3. Lancer le script :

```bash
node scripts/create-album.js <dossier-cloudinary> <id> "<titre>" "<description>" <categorie> [date]
```

Exemple :

```bash
node scripts/create-album.js noel-2025 noel-2025 "Noël en famille" "Souvenirs de Noël 2025" portrait 2025-12-25
```

Le script récupère les photos du dossier, génère le bloc de l'album et l'insère en tête de `albumsData`. Si l'`id` existe déjà, l'album est **mis à jour** (photos remplacées, `createdAt` conservé, `updatedAt` rafraîchi, ancienne `eventDate` conservée si aucune n'est donnée).

L'`id` sert d'URL (`/gallery/<id>`) : privilégier minuscules et tirets, sans espaces.

4. Optionnel : éditer `albums.js` pour titrer ou décrire certaines photos.
5. `npm run build`, puis commit et push sur `develop`.

### Ordre d'affichage

1. Albums avec `eventDate` (`YYYY-MM-DD`) en premier, du plus récent au plus ancien.
2. Albums sans `eventDate`, triés par `displayOrder` croissant.
3. En cas d'égalité, `createdAt` le plus récent d'abord.

En développement, un avertissement console signale les `displayOrder` en doublon (albums sans `eventDate`).

### Catégories

Valeurs utilisées : `portrait`, `landscape`, `concerts`, `spectacle`, `essais`, `Astrophotographie`. Garder une orthographe identique d'un album à l'autre, sinon le filtre de la galerie crée une catégorie en plus.

## 📈 Analytics et SEO

- **Google Analytics 4** : initialisé dans `App.js` via `utils/analytics.js`, une page vue par changement de route. Ne pas ajouter la balise `gtag.js` dans `index.html` (doublon de comptage).
- **Meta tags** : chaque page définit son `<Helmet>` (titre, description, `og:*`). `public/index.html` ne contient volontairement plus de `og:*` en dur, pour éviter les doublons. Contrôle dans DevTools → Elements → `<head>` (une seule balise `og:title`, avec `data-rh="true"`). Le « code source » de la page ne les montre pas : ils sont ajoutés par JavaScript.
- **Sitemap** : `public/sitemap.xml` généré automatiquement avant chaque build à partir des `id` d'albums.
- **`public/robots.txt`** : autorise tout et référence le sitemap.
- **Search Console** : propriété `thomaspretre.fr`, sitemap `https://thomaspretre.fr/sitemap.xml` à soumettre.

## 🐛 Dépannage

| Symptôme | Cause / solution |
|---|---|
| `ENOENT package.json` | Commande lancée hors de la racine du projet |
| Build Vercel : `ENOTFOUND` sur un registre interne | `.npmrc` absent ou non commité, ou `package-lock.json` contenant `glouton` (`grep -c glouton package-lock.json` doit afficher 0) |
| `Helmet is not defined` | Import `react-helmet-async` manquant dans la page |
| `Cannot read properties of undefined (reading 'add')` | `HelmetProvider` absent de `src/index.js` |
| Tous les liens du slider mènent au même album | Les slides sont superposées : `.slide` doit avoir `pointer-events: none`, `.slide.active` `pointer-events: auto` |
| Un album ne s'ouvre pas | `id` dupliqué ou avec des espaces dans `albums.js` |
| `error: Pulling is not possible because you have unmerged files` | Résoudre les conflits (`git status`), `git add`, `git commit` |

## 🗺️ À faire

- Flux Instagram (composants présents mais désactivés sur la page d'accueil)
- Améliorer l'affichage des photos
- Trouver une solution pour gérer les vignettes visuelles
- Fixer l'ordre (`order`) dans `albums.js`
