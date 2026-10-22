// Service pour récupérer les données Instagram via l'API Basic Display
class InstagramService {
  constructor() {
    this.accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
    this.baseUrl = 'https://graph.instagram.com';
    this.cacheKey = 'instagram_feed_cache';
    this.cacheExpiry = 30 * 60 * 1000; // 30 minutes en millisecondes
  }

  /**
   * Récupère les posts Instagram depuis l'API ou le cache
   * @param {number} limit - Nombre de posts à récupérer (max 25)
   * @returns {Promise<Array>} - Array des posts Instagram
   */
  async getFeed(limit = 9) {
    try {
      // Vérifier le cache d'abord
      const cachedData = this.getCachedData();
      if (cachedData) {
        return cachedData.slice(0, limit);
      }

      // Si pas de token, retourner des données de démonstration
      if (!this.accessToken) {
        console.warn('Instagram Access Token non configuré, utilisation des données de démo');
        return this.getDemoData(limit);
      }

      // Récupérer les données depuis l'API Instagram
      const response = await fetch(
        `${this.baseUrl}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${limit}&access_token=${this.accessToken}`
      );

      if (!response.ok) {
        throw new Error(`Erreur API Instagram: ${response.status}`);
      }

      const data = await response.json();
      
      // Filtrer seulement les images et vidéos
      const posts = data.data
        .filter(post => post.media_type === 'IMAGE' || post.media_type === 'VIDEO')
        .map(post => ({
          id: post.id,
          caption: post.caption || '',
          mediaType: post.media_type,
          mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
          permalink: post.permalink,
          timestamp: post.timestamp
        }));

      // Mettre en cache les données
      this.setCachedData(posts);

      return posts;
    } catch (error) {
      console.error('Erreur lors de la récupération du feed Instagram:', error);
      // En cas d'erreur, retourner les données de démo
      return this.getDemoData(limit);
    }
  }

  /**
   * Récupère les données mises en cache
   * @returns {Array|null} - Posts en cache ou null si expiré
   */
  getCachedData() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // Vérifier si le cache n'est pas expiré
      if (now - timestamp < this.cacheExpiry) {
        return data;
      }

      // Cache expiré, le supprimer
      localStorage.removeItem(this.cacheKey);
      return null;
    } catch (error) {
      console.error('Erreur lors de la lecture du cache:', error);
      return null;
    }
  }

  /**
   * Met en cache les données Instagram
   * @param {Array} data - Posts à mettre en cache
   */
  setCachedData(data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Erreur lors de la mise en cache:', error);
    }
  }

  /**
   * Données de démonstration pour le développement
   * @param {number} limit - Nombre de posts à retourner
   * @returns {Array} - Posts de démonstration
   */
  getDemoData(limit = 9) {
    const demoData = [
      {
        id: 'demo_1',
        caption: 'Séance photo portrait en extérieur 📸 #photography #portrait',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288469/_MG_4694_suin7j.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-26T10:00:00+0000'
      },
      {
        id: 'demo_2',
        caption: 'Concert au Petit Bain 🎵 #concert #music #photography',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756289062/_MG_3568_zpml2f.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-25T15:30:00+0000'
      },
      {
        id: 'demo_3',
        caption: 'Paysages d\'Étretat 🌊 #landscape #nature #normandie',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756308038/_MG_0511-min_mw7dnn.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-24T09:15:00+0000'
      },
      {
        id: 'demo_4',
        caption: 'Séance portrait en studio 💡 #studio #portrait #photography',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288472/_MG_4716_uxutjq.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-23T14:20:00+0000'
      },
      {
        id: 'demo_5',
        caption: 'Behind the scenes 🎬 #bts #photography #work',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288586/IMG_3656_g2glww.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-22T11:45:00+0000'
      },
      {
        id: 'demo_6',
        caption: 'Concert Jades 🎸 #concert #live #music',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288999/_MG_9606_dtvzk7.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-21T20:30:00+0000'
      },
      {
        id: 'demo_7',
        caption: 'Nature morte artistique 🎨 #stilllife #art #photography',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288569/_MG_7717_a1q5wv.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-20T16:10:00+0000'
      },
      {
        id: 'demo_8',
        caption: 'Portrait hivernal ❄️ #winter #portrait #photography',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288508/_MG_4433-2_ujg7we.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-19T13:25:00+0000'
      },
      {
        id: 'demo_9',
        caption: 'Exploration urbaine 🏙️ #urban #street #photography',
        mediaType: 'IMAGE',
        mediaUrl: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756288357/_MG_0587_aurtio.jpg',
        permalink: 'https://www.instagram.com/tom_p_pics/',
        timestamp: '2025-01-18T08:40:00+0000'
      }
    ];

    return demoData.slice(0, limit);
  }

  /**
   * Formate la date pour l'affichage
   * @param {string} timestamp - Timestamp ISO
   * @returns {string} - Date formatée
   */
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Il y a 1 jour';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    });
  }

  /**
   * Tronque le texte de la caption
   * @param {string} text - Texte à tronquer
   * @param {number} maxLength - Longueur maximale
   * @returns {string} - Texte tronqué
   */
  truncateCaption(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }
}

// Export d'une instance unique
export default new InstagramService();