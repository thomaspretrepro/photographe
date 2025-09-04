const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to the albums.js file
const ALBUMS_FILE_PATH = path.join(__dirname, '../client/src/data/albums.js');

// Helper function to generate the albums.js content
const generateAlbumsJS = (albums) => {
  const albumsString = JSON.stringify(albums, null, 2);
  
  return `// Shared albums data
export const albumsData = ${albumsString};

// Helper function to get album by ID
export const getAlbumById = (id) => {
  const savedAlbums = localStorage.getItem('albumsData');
  let albums;
  
  if (savedAlbums) {
    albums = JSON.parse(savedAlbums);
  } else {
    // Initialize with full data including photos
    albums = albumsData;
    localStorage.setItem('albumsData', JSON.stringify(albums));
  }
  
  return albums.find(album => album.id === id);
};

// Helper function to get albums for gallery (without photos data)
export const getGalleryAlbums = () => {
  const savedAlbums = localStorage.getItem('albumsData');
  let albums;
  
  if (savedAlbums) {
    albums = JSON.parse(savedAlbums);
  } else {
    // Initialize with full data including photos
    albums = albumsData;
    localStorage.setItem('albumsData', JSON.stringify(albums));
  }
  
  // Sort albums by sortOrder
  return albums
    .map(({ photos, ...album }) => album)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
};

// Helper function to get full albums data (with photos)
export const getFullAlbumsData = () => {
  const savedAlbums = localStorage.getItem('albumsData');
  
  if (savedAlbums) {
    const albums = JSON.parse(savedAlbums);
    // Sort albums by sortOrder and photos within each album
    return albums
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(album => ({
        ...album,
        photos: (album.photos || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      }));
  } else {
    // Initialize with full data including photos
    localStorage.setItem('albumsData', JSON.stringify(albumsData));
    return albumsData;
  }
};

// Helper function to initialize localStorage with default data
export const initializeAlbumsData = () => {
  const savedAlbums = localStorage.getItem('albumsData');
  if (!savedAlbums) {
    localStorage.setItem('albumsData', JSON.stringify(albumsData));
  }
};

// Helper function to save albums data to localStorage
export const saveAlbumsData = (albums) => {
  localStorage.setItem('albumsData', JSON.stringify(albums));
};

// Helper function to export localStorage data to albums.js format
export const exportToAlbumsJS = () => {
  const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
  
  // Simple function to create downloadable content
  const albumsString = JSON.stringify(savedAlbums, null, 2);
  
  const jsContent = \`// Shared albums data
export const albumsData = \${albumsString};

// Helper function to get album by ID
export const getAlbumById = (id) => {
  const savedAlbums = localStorage.getItem('albumsData');
  let albums;
  
  if (savedAlbums) {
    albums = JSON.parse(savedAlbums);
  } else {
    // Initialize with full data including photos
    albums = albumsData;
    localStorage.setItem('albumsData', JSON.stringify(albums));
  }
  
  return albums.find(album => album.id === id);
};

// Helper function to get albums for gallery (without photos data)
export const getGalleryAlbums = () => {
  const savedAlbums = localStorage.getItem('albumsData');
  let albums;
  
  if (savedAlbums) {
    albums = JSON.parse(savedAlbums);
  } else {
    // Initialize with full data including photos
    albums = albumsData;
    localStorage.setItem('albumsData', JSON.stringify(albums));
  }
  
  // Sort albums by sortOrder
  return albums
    .map(({ photos, ...album }) => album)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
};

// Helper function to get full albums data (with photos)
export const getFullAlbumsData = () => {
  const savedAlbums = localStorage.getItem('albumsData');
  
  if (savedAlbums) {
    const albums = JSON.parse(savedAlbums);
    // Sort albums by sortOrder and photos within each album
    return albums
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(album => ({
        ...album,
        photos: (album.photos || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      }));
  } else {
    // Initialize with full data including photos
    localStorage.setItem('albumsData', JSON.stringify(albumsData));
    return albumsData;
  }
};

// Helper function to initialize localStorage with default data
export const initializeAlbumsData = () => {
  const savedAlbums = localStorage.getItem('albumsData');
  if (!savedAlbums) {
    localStorage.setItem('albumsData', JSON.stringify(albumsData));
  }
};

// Helper function to save albums data to localStorage
export const saveAlbumsData = (albums) => {
  localStorage.setItem('albumsData', JSON.stringify(albums));
};\`;

  return jsContent;
};

// Helper function to download the exported albums.js file
export const downloadAlbumsJS = () => {
  const content = exportToAlbumsJS();
  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'albums.js';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};`;
};

// API Routes

// GET /api/albums - Get current albums data
app.get('/api/albums', (req, res) => {
  try {
    // Read the current albums.js file
    const fileContent = fs.readFileSync(ALBUMS_FILE_PATH, 'utf8');
    
    // Extract the albumsData array from the file
    const albumsDataMatch = fileContent.match(/export const albumsData = (\[[\s\S]*?\]);/);
    
    if (albumsDataMatch) {
      const albumsData = JSON.parse(albumsDataMatch[1]);
      res.json({ success: true, data: albumsData });
    } else {
      res.status(500).json({ success: false, error: 'Could not parse albums data' });
    }
  } catch (error) {
    console.error('Error reading albums file:', error);
    res.status(500).json({ success: false, error: 'Failed to read albums file' });
  }
});

// POST /api/albums/save - Save albums data to albums.js file
app.post('/api/albums/save', (req, res) => {
  try {
    const { albums } = req.body;
    
    if (!albums || !Array.isArray(albums)) {
      return res.status(400).json({ success: false, error: 'Invalid albums data' });
    }
    
    // Generate the new albums.js content
    const newContent = generateAlbumsJS(albums);
    
    // Create backup of current file
    const backupPath = ALBUMS_FILE_PATH + '.backup.' + Date.now();
    fs.copyFileSync(ALBUMS_FILE_PATH, backupPath);
    
    // Write the new content to albums.js
    fs.writeFileSync(ALBUMS_FILE_PATH, newContent, 'utf8');
    
    console.log('Albums data saved successfully');
    res.json({ 
      success: true, 
      message: 'Albums data saved successfully',
      backup: backupPath 
    });
    
  } catch (error) {
    console.error('Error saving albums file:', error);
    res.status(500).json({ success: false, error: 'Failed to save albums file' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Albums file path: ${ALBUMS_FILE_PATH}`);
});