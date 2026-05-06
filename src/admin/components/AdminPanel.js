import React, { useState } from 'react';
import { albumsData, getAllCategories } from '../../data/albums';
import AlbumForm from './AlbumForm';
import '../style/admin.css';
import fileManager from '../utils/fileManager';


const AdminPanel = () => {
    const [albums, setAlbums] = useState(albumsData);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    const categories = getAllCategories();

    const filteredAlbums = selectedCategory === 'all'
        ? albums
        : albums.filter(album => album.category === selectedCategory);

    const handleCreateAlbum = () => {
        setEditingAlbum(null);
        setShowCreateForm(true);
    };

    const handleEditAlbum = (album) => {
        setEditingAlbum(album);
        setShowCreateForm(true);
    };

    const handleCloseForm = () => {
        setShowCreateForm(false);
        setEditingAlbum(null);
    };

    const handleSaveAlbum = (albumData) => {
        try {
            if (editingAlbum) {
                // Mode édition - modifier en mémoire seulement
                const updatedAlbums = albums.map(album =>
                    album.id === editingAlbum.id
                        ? { ...albumData, id: editingAlbum.id, createdAt: album.createdAt, updatedAt: new Date().toISOString() }
                        : album
                );
                setAlbums(updatedAlbums);
            } else {
                // Mode création - ajouter en mémoire seulement
                const newAlbum = {
                    ...albumData,
                    id: fileManager.generateAlbumId(albumData.title),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                setAlbums([...albums, newAlbum]);
            }

            setHasUnsavedChanges(true);
            setShowCreateForm(false);
            setEditingAlbum(null);

            alert('✅ Album ' + (editingAlbum ? 'modifié' : 'créé') + ' en mémoire. N\'oubliez pas de sauvegarder !');
        } catch (error) {
            console.error('Erreur:', error);
            alert('❌ Erreur: ' + error.message);
        }
    };

    const handleDeleteAlbum = (albumId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet album ?')) {
            const updatedAlbums = albums.filter(album => album.id !== albumId);
            setAlbums(updatedAlbums);
            setHasUnsavedChanges(true);
            alert('✅ Album supprimé en mémoire. N\'oubliez pas de sauvegarder !');
        }
    };

    const handleSaveAllChanges = async () => {
        if (!hasUnsavedChanges) {
            alert('Aucune modification à sauvegarder.');
            return;
        }

        setIsSaving(true);
        try {
            // Mettre à jour le fileManager avec les albums modifiés
            fileManager.albums = [...albums];

            // Sauvegarder le fichier
            const result = await fileManager.saveAlbums();

            if (result.success) {
                alert('✅ ' + result.message);
                setHasUnsavedChanges(false);
            } else {
                alert('❌ ' + result.message);
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            alert('❌ Erreur: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelChanges = () => {
        if (window.confirm('Êtes-vous sûr de vouloir annuler toutes les modifications non sauvegardées ?')) {
            setAlbums(albumsData); // Revenir aux données originales
            setHasUnsavedChanges(false);
            setShowCreateForm(false);
            setEditingAlbum(null);
            alert('✅ Modifications annulées.');
        }
    };





    return (
        <div className="admin-panel">
            <header className="admin-header">
                <h1>🎨 Administration des Albums</h1>
                <p>Gérez vos albums photo en toute simplicité</p>
            </header>

            <div className="admin-actions">
                <button
                    className="btn-primary"
                    onClick={handleCreateAlbum}
                >
                    ➕ Créer un nouvel album
                </button>

                {hasUnsavedChanges && (
                    <div className="save-actions">
                        <button
                            className="btn-save"
                            onClick={handleSaveAllChanges}
                            disabled={isSaving}
                        >
                            {isSaving ? '💾 Sauvegarde...' : '💾 Sauvegarder tous les changements'}
                        </button>
                        <button
                            className="btn-cancel"
                            onClick={handleCancelChanges}
                            disabled={isSaving}
                        >
                            ❌ Annuler les modifications
                        </button>
                    </div>
                )}

                {hasUnsavedChanges && (
                    <div className="unsaved-indicator">
                        ⚠️ Modifications non sauvegardées
                    </div>
                )}

                <div className="filter-section">
                    <label htmlFor="category-filter">Filtrer par catégorie :</label>
                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Toutes les catégories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="albums-grid">
                {filteredAlbums.map(album => (
                    <div key={album.id} className="album-card">
                        <div className="album-cover">
                            <img
                                src={album.coverImage}
                                alt={album.title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
                                }}
                            />
                        </div>

                        <div className="album-info">
                            <h3>{album.title}</h3>
                            <p className="album-category">{album.category}</p>
                            <p className="album-description">{album.description}</p>
                            <p className="album-stats">
                                📸 {album.photos?.length || 0} photos
                            </p>
                        </div>

                        <div className="album-actions">
                            <button
                                className="btn-edit"
                                onClick={() => handleEditAlbum(album)}
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => handleDeleteAlbum(album.id)}
                            >
                                🗑️ Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showCreateForm && (
                <AlbumForm
                    album={editingAlbum}
                    onSave={handleSaveAlbum}
                    onCancel={handleCloseForm}
                />
            )}
        </div>
    );
};

export default AdminPanel;
