import React, { useState, useEffect } from 'react';

const CloudinaryBrowser = ({ onPhotosSelected, onCancel }) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [widgetLoaded, setWidgetLoaded] = useState(false);

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;

    // Charger le script Cloudinary Widget
    useEffect(() => {
        if (window.cloudinary) {
            setWidgetLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://media-library.cloudinary.com/global/all.js';
        script.async = true;
        script.onload = () => setWidgetLoaded(true);
        document.head.appendChild(script);
    }, []);

    // Ouvrir la Media Library pour PARCOURIR les photos existantes
    const openMediaLibrary = () => {
        if (!window.cloudinary || !widgetLoaded) {
            alert('Widget en cours de chargement...');
            return;
        }

        try {
            const widget = window.cloudinary.openMediaLibrary({
                cloud_name: cloudName,
                api_key: apiKey,
                multiple: true,
                max_files: 20,
                resource_type: 'image',
                button_class: 'cloudinary-button',
                button_caption: 'Sélectionner des photos'
            }, {
                insertHandler: (data) => {
                    console.log('Photos sélectionnées depuis la médiathèque:', data);

                    // Transformer les données pour notre format
                    const transformedPhotos = data.assets.map(asset => ({
                        public_id: asset.public_id,
                        secure_url: asset.secure_url,
                        width: asset.width,
                        height: asset.height,
                        format: asset.format,
                        folder: asset.public_id.split('/')[0] || 'root',
                        created_at: asset.created_at,
                        bytes: asset.bytes,
                        tags: asset.tags || []
                    }));

                    setSelectedPhotos(prev => [...prev, ...transformedPhotos]);
                }
            });

        } catch (error) {
            console.error('Erreur Media Library:', error);

            // Fallback : Widget d'upload avec option browse
            openUploadWidget();
        }
    };

    // Fallback : Widget d'upload avec possibilité de browse
    const openUploadWidget = () => {
        if (!window.cloudinary) return;

        // Charger le script d'upload si pas déjà fait
        if (!document.querySelector('script[src*="upload-widget"]')) {
            const script = document.createElement('script');
            script.src = 'https://upload-widget.cloudinary.com/global/all.js';
            script.async = true;
            script.onload = () => {
                createUploadWidget();
            };
            document.head.appendChild(script);
        } else {
            createUploadWidget();
        }
    };

    const createUploadWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: 'ml_default', // Preset par défaut
            sources: ['local', 'url', 'camera', 'image_search', 'facebook', 'dropbox', 'google_drive', 'instagram'],
            multiple: true,
            maxFiles: 20,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxFileSize: 10000000,
            showAdvancedOptions: true,
            cropping: false,
            folder: 'admin_selection',
            tags: ['admin'],
            theme: 'purple'
        }, (error, result) => {
            if (!error && result && result.event === 'success') {
                const newPhoto = {
                    public_id: result.info.public_id,
                    secure_url: result.info.secure_url,
                    width: result.info.width,
                    height: result.info.height,
                    format: result.info.format,
                    folder: result.info.public_id.split('/')[0] || 'root',
                    created_at: result.info.created_at,
                    bytes: result.info.bytes
                };

                setSelectedPhotos(prev => {
                    const exists = prev.find(p => p.public_id === newPhoto.public_id);
                    if (exists) return prev;
                    return [...prev, newPhoto];
                });
            }
        });

        widget.open();
    };

    // Ajouter manuellement par URL (pour vos photos existantes)
    const addPhotoByUrl = () => {
        const url = prompt('Entrez l\'URL d\'une photo Cloudinary existante:');
        if (!url || !url.includes('cloudinary.com')) {
            alert('Veuillez entrer une URL Cloudinary valide');
            return;
        }

        // Extraire les informations de l'URL Cloudinary
        const urlParts = url.split('/');
        const uploadIndex = urlParts.findIndex(part => part === 'upload');

        if (uploadIndex === -1) {
            alert('URL Cloudinary invalide');
            return;
        }

        const filename = urlParts[urlParts.length - 1];
        const [name, format] = filename.split('.');
        const publicId = urlParts.slice(uploadIndex + 2).join('/').replace(`.${format}`, '');

        const newPhoto = {
            public_id: publicId,
            secure_url: url,
            width: 800, // Valeur par défaut
            height: 600, // Valeur par défaut
            format: format,
            folder: publicId.split('/')[0] || 'manual',
            created_at: new Date().toISOString(),
            bytes: 0
        };

        setSelectedPhotos(prev => {
            const exists = prev.find(p => p.secure_url === url);
            if (exists) return prev;
            return [...prev, newPhoto];
        });
    };

    // Parcourir vos albums existants pour récupérer les URLs
    const loadFromExistingAlbums = async () => {
        try {
            const { albumsData } = await import('../../data/albums');

            const existingPhotos = [];

            albumsData.forEach(album => {
                album.photos.forEach(photo => {
                    const urlParts = photo.src.split('/');
                    const filename = urlParts[urlParts.length - 1];
                    const [name, format] = filename.split('.');

                    existingPhotos.push({
                        public_id: `${album.category}/${name}`,
                        secure_url: photo.src,
                        width: 800,
                        height: 600,
                        format: format,
                        folder: album.category,
                        album_title: album.title,
                        existing: true
                    });
                });
            });

            setSelectedPhotos(prev => [...prev, ...existingPhotos]);

        } catch (err) {
            console.error('Erreur lors du chargement des albums existants:', err);
        }
    };

    // Supprimer une photo
    const removePhoto = (photoId) => {
        setSelectedPhotos(prev => prev.filter(photo => photo.public_id !== photoId));
    };

    // Confirmer la sélection
    const confirmSelection = () => {
        if (selectedPhotos.length > 0) {
            onPhotosSelected(selectedPhotos);
        }
    };

    return (
        <div className="cloudinary-browser-overlay">
            <div className="cloudinary-browser-container">
                <div className="cloudinary-browser-header">
                    <h3>📸 Parcourir vos photos Cloudinary</h3>
                    <button className="close-button" onClick={onCancel}>✕</button>
                </div>

                <div className="cloudinary-browser-content">
                    {!widgetLoaded ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Chargement de la médiathèque Cloudinary...</p>
                        </div>
                    ) : (
                        <>
                            {/* Boutons d'action */}
                            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                                <button
                                    onClick={openMediaLibrary}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '15px 25px',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                        marginBottom: '10px'
                                    }}
                                >
                                    📂 Parcourir ma médiathèque
                                </button>

                                <button
                                    onClick={addPhotoByUrl}
                                    style={{
                                        background: '#17a2b8',
                                        color: 'white',
                                        border: 'none',
                                        padding: '15px 25px',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                        marginBottom: '10px'
                                    }}
                                >
                                    🔗 Ajouter par URL
                                </button>

                                <button
                                    onClick={loadFromExistingAlbums}
                                    style={{
                                        background: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        padding: '15px 25px',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        marginBottom: '10px'
                                    }}
                                >
                                    📋 Charger depuis mes albums
                                </button>
                            </div>

                            {/* Photos sélectionnées */}
                            {selectedPhotos.length > 0 && (
                                <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px' }}>
                                    <h4>Photos sélectionnées ({selectedPhotos.length})</h4>
                                    <div className="photos-grid">
                                        {selectedPhotos.map(photo => (
                                            <div key={photo.public_id} className="photo-item selected">
                                                <img src={photo.secure_url} alt={photo.public_id} loading="lazy" />
                                                <div className="photo-overlay">
                                                    <div className="photo-info">
                                                        <span className="photo-name">{photo.public_id}</span>
                                                        <span className="photo-size">{photo.width} × {photo.height}</span>
                                                        {photo.existing && <span className="photo-badge">📋 Existant</span>}
                                                    </div>
                                                    <button
                                                        onClick={() => removePhoto(photo.public_id)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '5px',
                                                            background: '#dc3545',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            width: '25px',
                                                            height: '25px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedPhotos.length === 0 && (
                                <div style={{ textAlign: 'center', color: '#6c757d', marginTop: '20px' }}>
                                    <p><strong>3 façons de récupérer vos photos :</strong></p>
                                    <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '15px' }}>
                                        <li>📂 <strong>Médiathèque :</strong> Parcourir toutes vos photos Cloudinary</li>
                                        <li>🔗 <strong>Par URL :</strong> Coller l'URL d'une photo existante</li>
                                        <li>📋 <strong>Albums existants :</strong> Récupérer depuis vos albums actuels</li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Actions */}
                <div className="cloudinary-browser-actions">
                    <button type="button" onClick={onCancel} className="btn-cancel">
                        Annuler
                    </button>
                    <button
                        type="button"
                        onClick={confirmSelection}
                        className="btn-confirm"
                        disabled={selectedPhotos.length === 0}
                    >
                        Confirmer ({selectedPhotos.length} photos)
                    </button>
                </div>

                {/* Info */}
                <div style={{
                    padding: '15px 25px',
                    background: '#d4edda',
                    borderTop: '1px solid #c3e6cb',
                    fontSize: '14px',
                    color: '#155724'
                }}>
                    ✅ <strong>Mode PARCOURIR :</strong> Récupérez vos photos existantes pour créer automatiquement vos albums !
                </div>
            </div>
        </div>
    );
};

export default CloudinaryBrowser;
