import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getGalleryAlbums,
  initializeAlbumsData,
  saveAlbumsToGitHub,
  getGitHubConfig,
  saveGitHubConfig,
  isConfigurationComplete,
  testGitHubToken
} from '../data/albums';
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
  const [isTesting, setIsTesting] = useState(false);
  const [showGitHubConfig, setShowGitHubConfig] = useState(false);
  const [gitHubConfig, setGitHubConfig] = useState({
    owner: '',
    repo: '',
    token: '',
    branch: 'main'
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize data with all existing photos
    initializeAlbumsData();
    loadData();
    loadGitHubConfig();
  }, []);

  const loadGitHubConfig = () => {
    const config = getGitHubConfig();
    if (config) {
      setGitHubConfig(config);
    }
  };

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

  const handleSaveGitHubConfig = () => {
    try {
      saveGitHubConfig(gitHubConfig.owner, gitHubConfig.repo, gitHubConfig.token, gitHubConfig.branch);
      setShowGitHubConfig(false);
      setNotification({
        type: 'success',
        message: 'Configuration GitHub sauvegardée avec succès'
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Erreur lors de la sauvegarde de la configuration'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleTestGitHubToken = async () => {
    setIsTesting(true);
    setNotification(null);
    
    try {
      const result = await testGitHubToken();
      
      setNotification({
        type: result.success ? 'success' : 'error',
        message: result.message
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Erreur lors du test du token'
      });
    } finally {
      setIsTesting(false);
      setTimeout(() => setNotification(null), 5000);
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
              <button
                onClick={() => setShowGitHubConfig(true)}
                className="action-card config-btn"
              >
                <div className="action-icon">⚙️</div>
                <h3>Configuration GitHub</h3>
                <p>
                  {isConfigurationComplete()
                    ? '✅ Configuration complète'
                    : '⚠️ Configuration GitHub requise'
                  }
                </p>
              </button>
              {isConfigurationComplete() && (
                <button
                  onClick={handleTestGitHubToken}
                  className="action-card test-btn"
                  disabled={isTesting}
                >
                  <div className="action-icon">{isTesting ? '⏳' : '🧪'}</div>
                  <h3>{isTesting ? 'Test en cours...' : 'Tester Token'}</h3>
                  <p>{isTesting ? 'Vérification GitHub...' : 'Vérifier la validité du token GitHub'}</p>
                </button>
              )}
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
                onClick={() => setShowGitHubConfig(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="config-info">
                Configurez votre repository GitHub pour la publication automatique.
              </p>
              <div className="form-group">
                <label htmlFor="owner">Propriétaire du repository :</label>
                <input
                  type="text"
                  id="owner"
                  value={gitHubConfig.owner}
                  onChange={(e) => setGitHubConfig({...gitHubConfig, owner: e.target.value})}
                  placeholder="ex: votre-username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="repo">Nom du repository :</label>
                <input
                  type="text"
                  id="repo"
                  value={gitHubConfig.repo}
                  onChange={(e) => setGitHubConfig({...gitHubConfig, repo: e.target.value})}
                  placeholder="ex: mon-portfolio"
                />
              </div>
              <div className="form-group">
                <label htmlFor="token">Token GitHub (Personal Access Token) :</label>
                <input
                  type="password"
                  id="token"
                  value={gitHubConfig.token}
                  onChange={(e) => setGitHubConfig({...gitHubConfig, token: e.target.value})}
                  placeholder="ghp_..."
                />
                <small className="help-text">
                  Créez un token avec les permissions 'repo' et 'workflow' dans GitHub → Settings → Developer settings
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branche :</label>
                <input
                  type="text"
                  id="branch"
                  value={gitHubConfig.branch}
                  onChange={(e) => setGitHubConfig({...gitHubConfig, branch: e.target.value})}
                  placeholder="main"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowGitHubConfig(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveGitHubConfig}
                className="btn-primary"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;