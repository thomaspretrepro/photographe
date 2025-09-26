import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getGalleryAlbums,
  initializeAlbumsData,
  saveAlbumsToGitHub,
  setGitHubToken,
  getGitHubToken,
  getGitHubConfig
} from '../data/albums';
import { GITHUB_CONFIG, isConfigurationComplete } from '../config/github';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState({
    totalAlbums: 0,
    totalPhotos: 0,
    categories: {}
  });
  const [notification, setNotification] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showGitHubConfig, setShowGitHubConfig] = useState(false);
  const [gitHubConfig, setGitHubConfig] = useState({
    owner: '',
    repo: '',
    token: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize data with all existing photos
    initializeAlbumsData();
    loadData();
    
    // Load GitHub configuration
    const config = getGitHubConfig();
    const token = getGitHubToken();
    setGitHubConfig({
      owner: config.owner || '',
      repo: config.repo || '',
      token: token || ''
    });
  }, []);

  const loadData = () => {
    // Load albums from localStorage (now guaranteed to have all photos)
    const albumsData = getGalleryAlbums();
    setAlbums(albumsData);
    
    // Calculate stats
    const totalPhotos = albumsData.reduce((sum, album) => sum + album.photoCount, 0);
    const categories = albumsData.reduce((acc, album) => {
      acc[album.category] = (acc[album.category] || 0) + 1;
      return acc;
    }, {});
    
    setStats({
      totalAlbums: albumsData.length,
      totalPhotos,
      categories
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    onLogout(false);
    navigate('/admin');
  };

  const deleteAlbum = (albumId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet album ?')) {
      // Get full albums data from localStorage
      const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
      // Filter out the album to delete
      const updatedAlbums = savedAlbums.filter(album => album.id !== albumId);
      // Save back to localStorage
      localStorage.setItem('albumsData', JSON.stringify(updatedAlbums));
      // Refresh the display
      loadData();
    }
  };

  const handlePublishToGitHub = async () => {
    setIsSaving(true);
    setNotification(null);
    
    try {
      const result = await saveAlbumsToGitHub();
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: result.message
        });
      } else {
        if (result.requiresToken || result.requiresConfig) {
          setShowGitHubConfig(true);
        }
        setNotification({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Erreur lors de la publication'
      });
    } finally {
      setIsSaving(false);
      // Auto-hide notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    }
  };


  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>Administration</h1>
            <div className="header-actions">
              <Link to="/" className="view-site-btn">Voir le site</Link>
              <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          {/* Notification */}
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📁</div>
              <div className="stat-info">
                <h3>{stats.totalAlbums}</h3>
                <p>Albums</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📸</div>
              <div className="stat-info">
                <h3>{stats.totalPhotos}</h3>
                <p>Photos</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏷️</div>
              <div className="stat-info">
                <h3>{Object.keys(stats.categories).length}</h3>
                <p>Catégories</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Actions rapides</h2>
            <div className="actions-grid">
              <Link to="/admin/albums/new" className="action-card">
                <div className="action-icon">➕</div>
                <h3>Nouvel Album</h3>
                <p>Créer un nouvel album photo</p>
              </Link>
              <Link to="/admin/photos/new" className="action-card">
                <div className="action-icon">🖼️</div>
                <h3>Ajouter Photo</h3>
                <p>Ajouter une photo à un album</p>
              </Link>
              <Link to="/admin/albums" className="action-card">
                <div className="action-icon">📋</div>
                <h3>Gérer Albums</h3>
                <p>Modifier ou supprimer des albums</p>
              </Link>
              <button
                onClick={handlePublishToGitHub}
                className="action-card export-btn"
                disabled={isSaving}
              >
                <div className="action-icon">{isSaving ? '⏳' : '🚀'}</div>
                <h3>{isSaving ? 'Publication...' : 'Publier'}</h3>
                <p>{isSaving ? 'Mise à jour GitHub Pages...' : 'Publier sur GitHub Pages'}</p>
              </button>
              <div className="action-card info-card">
                <div className="action-icon">ℹ️</div>
                <h3>Configuration</h3>
                <p>
                  {isConfigurationComplete()
                    ? '✅ Configuration complète'
                    : '⚠️ Configuration requise dans le code'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* All Albums */}
          <div className="recent-albums">
            <div className="section-header">
              <h2>Tous les albums</h2>
            </div>
            <div className="albums-grid">
              {albums.map(album => (
                <div key={album.id} className="album-card">
                  <div className="album-image">
                    <img src={album.coverImage} alt={album.title} />
                  </div>
                  <div className="album-info">
                    <h3>{album.title}</h3>
                    <p className="album-category">{album.category}</p>
                    <p className="album-count">{album.photoCount} photos</p>
                    <p className="album-sort-order">Ordre: {album.sortOrder || 0}</p>
                  </div>
                  <div className="album-actions">
                    <Link to={`/admin/albums/${album.id}/edit`} className="edit-btn">
                      Modifier
                    </Link>
                    <Link to={`/admin/albums/${album.id}/photos`} className="manage-photos-btn">
                      Gérer photos
                    </Link>
                    <button
                      onClick={() => deleteAlbum(album.id)}
                      className="delete-btn"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Configuration Modal */}
      {showGitHubConfig && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Configuration GitHub</h2>
              <button
                className="modal-close"
                onClick={() => setShowGitHubConfig(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="config-section">
                <h3>Repository GitHub (Configuration partagée)</h3>
                <div className="form-group">
                  <label>Nom d'utilisateur/Organisation :</label>
                  <input
                    type="text"
                    value={gitHubConfig.owner}
                    disabled
                    placeholder="Configuration partagée"
                  />
                  <small>Cette configuration est partagée et définie dans le code</small>
                </div>
                <div className="form-group">
                  <label>Nom du repository :</label>
                  <input
                    type="text"
                    value={gitHubConfig.repo}
                    disabled
                    placeholder="Configuration partagée"
                  />
                  <small>Cette configuration est partagée et définie dans le code</small>
                </div>
              </div>
              
              <div className="config-section">
                <h3>Token d'accès GitHub</h3>
                <div className="form-group">
                  <label>Personal Access Token :</label>
                  <input
                    type="password"
                    value={gitHubConfig.token}
                    onChange={(e) => handleConfigChange('token', e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  />
                  <small>
                    Créez un token sur GitHub : Settings → Developer settings → Personal access tokens → Tokens (classic)
                    <br />
                    Permissions requises : <code>repo</code> et <code>workflow</code>
                  </small>
                </div>
              </div>
              
              <div className="config-section">
                <h3>Instructions</h3>
                <ol>
                  <li>Créez un Personal Access Token sur GitHub avec les permissions <code>repo</code> et <code>workflow</code></li>
                  <li>Saisissez votre token ci-dessus (il sera stocké localement dans votre navigateur)</li>
                  <li>La configuration du repository est partagée et définie dans le code</li>
                  <li>Testez la publication</li>
                </ol>
                <div className="config-info">
                  <p><strong>Repository configuré :</strong> {GITHUB_CONFIG.owner}/{GITHUB_CONFIG.repo}</p>
                  <p><strong>Branche :</strong> {GITHUB_CONFIG.branch}</p>
                  <p><strong>Configuration complète :</strong> {isConfigurationComplete() ? '✅ Oui' : '❌ Non'}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowGitHubConfig(false)}
              >
                Annuler
              </button>
              <button
                className="btn-primary"
                onClick={handleSaveGitHubConfig}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Info */}
      {!isConfigurationComplete() && (
        <div className="config-warning">
          <h3>⚠️ Configuration GitHub requise</h3>
          <p>
            Veuillez modifier le fichier <code>client/src/config/github.js</code> avec vos informations :
          </p>
          <ul>
            <li><strong>owner</strong> : votre nom d'utilisateur GitHub</li>
            <li><strong>repo</strong> : le nom de votre repository</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;