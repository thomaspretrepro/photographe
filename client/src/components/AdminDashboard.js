import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getGalleryAlbums, initializeAlbumsData } from '../data/albums';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState({
    totalAlbums: 0,
    totalPhotos: 0,
    categories: {}
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize data with all existing photos
    initializeAlbumsData();
    loadData();
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
    </div>
  );
};

export default AdminDashboard;