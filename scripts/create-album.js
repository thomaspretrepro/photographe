require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Usage: node scripts/create-album.js <folder> <id> "<title>" "<description>" <category> [eventDate]
const [folderName, id, title, description, category, eventDateArg] = process.argv.slice(2);

if (!folderName || !id || !title || !category) {
    console.error('❌ Usage: node scripts/create-album.js <dossier-cloudinary> <id> "<titre>" "<description>" <categorie> [date YYYY-MM-DD]');
    console.error('Exemple: node scripts/create-album.js noel-2025 noel-2025 "Noël en famille" "Souvenirs de Noël 2025" portrait 2025-12-25');
    process.exit(1);
}

if (eventDateArg && (!/^\d{4}-\d{2}-\d{2}$/.test(eventDateArg) || Number.isNaN(new Date(eventDateArg).getTime()))) {
    console.error(`❌ Date invalide "${eventDateArg}". Format attendu : YYYY-MM-DD (ex: 2025-02-19).`);
    process.exit(1);
}

/**
 * Trouve les indices [start, end] du bloc d'un album donné (délimité par { ... })
 * en comptant les accolades, en partant de la position où "id": "xxx" est trouvé.
 * Retourne null si l'album n'existe pas.
 */
function findAlbumBlock(content, albumId) {
    const idMarker = `"id": "${albumId}"`;
    const idIndex = content.indexOf(idMarker);
    if (idIndex === -1) return null;

    // Remonte jusqu'à la '{' d'ouverture de cet album
    let start = content.lastIndexOf('{', idIndex);

    // Descend en comptant les accolades pour trouver la fermeture correspondante
    let depth = 0;
    let end = -1;
    for (let i = start; i < content.length; i++) {
        if (content[i] === '{') depth++;
        if (content[i] === '}') {
            depth--;
            if (depth === 0) {
                end = i;
                break;
            }
        }
    }

    if (end === -1) return null;

    // Inclut la virgule éventuelle juste après
    let afterEnd = end + 1;
    while (content[afterEnd] === ' ' || content[afterEnd] === '\n' || content[afterEnd] === '\r') afterEnd++;
    const hasTrailingComma = content[afterEnd] === ',';
    if (hasTrailingComma) afterEnd++;

    return { start, end: afterEnd };
}

async function createAlbum() {
    console.log(`🔍 Recherche des photos dans le dossier Cloudinary "${folderName}"...`);

    const result = await cloudinary.search
        .expression(`folder:${folderName}`)
        .sort_by('created_at', 'asc')
        .max_results(100)
        .execute();

    if (result.resources.length === 0) {
        console.error(`❌ Aucune photo trouvée dans le dossier "${folderName}". Vérifie le nom du dossier sur Cloudinary.`);
        process.exit(1);
    }

    const photos = result.resources.map((resource, index) => ({
        id: String(index + 1),
        src: resource.secure_url,
        title: '',
        description: '',
        order: index + 1,
    }));

    const albumsPath = path.join(__dirname, '../src/data/albums.js');
    const content = fs.readFileSync(albumsPath, 'utf-8');

    const existingBlock = findAlbumBlock(content, id);

    // Conserve la date de création et le displayOrder si l'album existe déjà
    let createdAt = new Date().toISOString();
    let displayOrder;
    let eventDate = eventDateArg || undefined;

    if (existingBlock) {
        const oldBlockContent = content.slice(existingBlock.start, existingBlock.end);

        if (!eventDate) {
            const eventDateMatch = oldBlockContent.match(/"eventDate":\s*"([^"]+)"/);
            if (eventDateMatch) eventDate = eventDateMatch[1];
        }

        const createdAtMatch = oldBlockContent.match(/"createdAt":\s*"([^"]+)"/);
        if (createdAtMatch) createdAt = createdAtMatch[1];

        const orderMatch = oldBlockContent.match(/"displayOrder":\s*(\d+)/);
        if (orderMatch) displayOrder = parseInt(orderMatch[1], 10);
    }

    // Récupère tous les displayOrder existants (hors album courant)
    const allOrderMatches = [...content.matchAll(/"id":\s*"([^"]+)"[\s\S]{0,200}?"displayOrder":\s*(\d+)/g)]
        .filter(m => m[1] !== id)
        .map(m => ({ id: m[1], order: parseInt(m[2], 10) }));

    if (displayOrder === undefined) {
        const maxOrder = allOrderMatches.length > 0 ? Math.max(...allOrderMatches.map(o => o.order)) : 0;
        displayOrder = maxOrder + 1;
    } else {
        const conflict = allOrderMatches.find(o => o.order === displayOrder);
        if (conflict) {
            console.warn(`⚠️  displayOrder ${displayOrder} déjà utilisé par l'album "${conflict.id}". Pense à ajuster manuellement dans albums.js.`);
        }
    }

    const newAlbum = {
        id,
        title,
        description: description || '',
        category,
        coverImage: photos[0].src,
        ...(eventDate && { eventDate }),
        displayOrder,
        photos,
        createdAt,
        updatedAt: new Date().toISOString(),
    };

    const newAlbumStr = JSON.stringify(newAlbum, null, 2)
        .split('\n')
        .map(line => '  ' + line)
        .join('\n');

    let updatedContent;
    let isUpdate = false;

    if (existingBlock) {
        isUpdate = true;
        console.log(`⚠️  Album "${id}" déjà existant, remplacement en cours...`);
        updatedContent =
            content.slice(0, existingBlock.start) +
            newAlbumStr + ',' +
            content.slice(existingBlock.end);
    } else {
        const insertionMarker = 'export const albumsData = [';
        const insertionPoint = content.indexOf(insertionMarker) + insertionMarker.length;
        updatedContent =
            content.slice(0, insertionPoint) +
            '\n' + newAlbumStr + ',' +
            content.slice(insertionPoint);
    }

    fs.writeFileSync(albumsPath, updatedContent);

    console.log(`\n✅ Album "${title}" ${isUpdate ? 'mis à jour' : 'ajouté'} avec succès !`);
    console.log(`   ${photos.length} photos importées depuis le dossier "${folderName}"`);
    console.log(`   displayOrder attribué : ${displayOrder}`);
    console.log(`   eventDate : ${eventDate || 'non définie (tri par displayOrder)'}`);
    console.log(`   → Pense à relire albums.js et ajouter les titres/descriptions des photos si besoin.\n`);
}

createAlbum().catch(err => {
    console.error('❌ Erreur:', err.message);
    process.exit(1);
});