import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Vérifier les identifiants (en production, utiliser des variables d'environnement)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$rQZ9QmSTnkKFUjKJkKJkKOeJ9QmSTnkKFUjKJkKJkKOeJ9QmSTnkKF'; // 'admin123'

    if (username !== adminUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    if (!isPasswordValid) {
      // Pour le développement, accepter aussi le mot de passe en clair
      if (password !== 'admin123') {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    // Générer le token JWT
    const token = jwt.sign(
      { username: adminUsername, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      token,
      user: {
        username: adminUsername,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}