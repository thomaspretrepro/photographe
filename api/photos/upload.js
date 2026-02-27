import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware d'authentification
const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default async function handler(req, res) {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vérifier l'authentification
    verifyToken(req);

    const { image, folder = 'photographe', tags = [] } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Upload vers Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: folder,
      tags: tags,
      resource_type: 'auto',
      quality: 'auto:good',
      fetch_format: 'auto',
      transformation: [
        { width: 2000, height: 2000, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });

    // Générer différentes tailles pour l'optimisation
    const optimizedUrls = {
      original: uploadResult.secure_url,
      large: cloudinary.url(uploadResult.public_id, {
        width: 1200,
        height: 800,
        crop: 'limit',
        quality: 'auto:good',
        fetch_format: 'auto'
      }),
      medium: cloudinary.url(uploadResult.public_id, {
        width: 800,
        height: 600,
        crop: 'limit',
        quality: 'auto:good',
        fetch_format: 'auto'
      }),
      thumbnail: cloudinary.url(uploadResult.public_id, {
        width: 400,
        height: 300,
        crop: 'fill',
        quality: 'auto:good',
        fetch_format: 'auto'
      })
    };

    return res.status(200).json({
      success: true,
      data: {
        public_id: uploadResult.public_id,
        urls: optimizedUrls,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
        created_at: uploadResult.created_at
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(500).json({ 
      error: 'Upload failed',
      details: error.message 
    });
  }
}

// Configuration pour Vercel (augmenter la limite de taille)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};