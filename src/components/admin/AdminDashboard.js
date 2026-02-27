import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { albumsAPI, authAPI } from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState({
    totalAlbums: 0,
    totalPhotos: 0,
    categories: {}
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await albumsAPI.getAll();
      const albumsData = response.data.albums || [];
      setAlbums(albumsData);
      
      // Calculate stats
      const totalPhotos = albumsData.reduce((sum, album) => sum + (album.photos?.length || 0), 0);
      const categories = albumsData.reduce((acc, album) => {
        acc[album.category] = (acc[album.category] || 0) + 1;
        return acc;
      }, {});
      
      setStats({
        totalAlbums: albumsData.length,
        totalPhotos,
        categories
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authAPI.logout();
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>Administration</h1>
            <div className="header-actions">
              <Link to="/" className="btn btn-outline">Voir le site</Link>
              <button onClick={handleLogout} className="btn">Déconnexion</button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
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
              <div className="action-card">
                <div className="action-icon">➕</div>
                <h3>Nouvel Album</h3>
                <p>Créer un nouvel album photo</p>
                <button className="btn btn-primary">Créer</button>
              </div>
              <div className="action-card">
                <div className="action-icon">🖼️</div>
                <h3>Ajouter Photo</h3>
                <p>Ajouter une photo à un album</p>
                <button className="btn btn-primary">Ajouter</button>
              </div>
              <div className="action-card">
                <div className="action-icon">📋</div>
                <h3>Gérer Albums</h3>
                <p>Modifier ou supprimer des albums</p>
                <button className="btn btn-primary">Gérer</button>
              </div>
            </div>
          </div>

          {/* Albums List */}
          <div className="albums-section">
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
                    <p className="album-count">{album.photos?.length || 0} photos</p>
                  </div>
                  <div className="album-actions">
                    <Link to={`/gallery/${album.id}`} className="btn btn-outline">
                      Voir
                    </Link>
                    <button className="btn btn-primary">
                      Éditer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;