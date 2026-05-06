import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAllCategories } from '../../data/albums';
import CloudinaryBrowser from './CloudinaryBrowser';

const AlbumForm = ({ album, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        coverImage: '',
        photos: [],
        createdAt: '',
        updatedAt: ''
    });

    const [newCategory, setNewCategory] = useState('');
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [showCloudinaryBrowser, setShowCloudinaryBrowser] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const existingCategories = getAllCategories();

    // Initialisation du formulaire
    useEffect(() => {
        if (album) {
            // Mode édition
            setFormData({
                ...album,
                updatedAt: new Date().toISOString()
            });
        } else {
            // Mode création
            setFormData({
                id: `album-${uuidv4()}`,
                title: '',
                description: '',
                category: '',
                coverImage: '',
                photos: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
    }, [album]);

    // Gestion des changements de champs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Gestion du changement de catégorie
    const handleCategoryChange = (e) => {
        const value = e.target.value;

        if (value === 'new') {
            setShowNewCategoryInput(true);
            setFormData(prev => ({ ...prev, category: '' }));
        } else {
            setShowNewCategoryInput(false);
            setFormData(prev => ({ ...prev, category: value }));
        }
    };

    // Gestion de la nouvelle catégorie
    const handleNewCategorySubmit = () => {
        if (newCategory.trim()) {
            setFormData(prev => ({ ...prev, category: newCategory.trim() }));
            setShowNewCategoryInput(false);
            setNewCategory('');
        }
    };

    // Validation du formulaire
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Le titre est obligatoire';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La description est obligatoire';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'La catégorie est obligatoire';
        }

        if (formData.photos.length === 0) {
            newErrors.photos = 'Au moins une photo est requise';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion de la sélection des photos
    const handlePhotosSelected = (selectedPhotos) => {
        const photos = selectedPhotos.map((photo, index) => ({
            id: `photo-${uuidv4()}`,
            src: photo.secure_url,
            title: photo.context?.custom?.title || '',
            description: photo.context?.custom?.description || '',
            order: index + 1
        }));

        setFormData(prev => ({
            ...prev,
            photos: photos,
            coverImage: photos[0]?.src || prev.coverImage
        }));

        setShowCloudinaryBrowser(false);

        // Effacer l'erreur photos si elle existe
        if (errors.photos) {
            setErrors(prev => ({ ...prev, photos: '' }));
        }
    };

    // Gestion de la soumission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Préparer les données finales
            const finalData = {
                ...formData,
                updatedAt: new Date().toISOString(),
                photoCount: formData.photos.length
            };

            await onSave(finalData);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            setErrors({ submit: 'Erreur lors de la sauvegarde. Veuillez réessayer.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="album-form-overlay">
            <div className="album-form-container">
                <div className="album-form-header">
                    <h2>
                        {album ? '✏️ Modifier l\'album' : '➕ Créer un nouvel album'}
                    </h2>
                    <button
                        className="close-button"
                        onClick={onCancel}
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="album-form">
                    {/* Titre */}
                    <div className="form-group">
                        <label htmlFor="title">Titre de l'album *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Ex: Portraits d'été au jardin"
                            className={errors.title ? 'error' : ''}
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Décrivez votre album en quelques mots..."
                            rows="3"
                            className={errors.description ? 'error' : ''}
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    {/* Catégorie */}
                    <div className="form-group">
                        <label htmlFor="category">Catégorie *</label>
                        <select
                            id="category"
                            value={showNewCategoryInput ? 'new' : formData.category}
                            onChange={handleCategoryChange}
                            className={errors.category ? 'error' : ''}
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            {existingCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="new">➕ Nouvelle catégorie</option>
                        </select>

                        {showNewCategoryInput && (
                            <div className="new-category-input">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="Nom de la nouvelle catégorie"
                                    onKeyPress={(e) => e.key === 'Enter' && handleNewCategorySubmit()}
                                />
                                <button
                                    type="button"
                                    onClick={handleNewCategorySubmit}
                                    className="btn-add-category"
                                >
                                    Ajouter
                                </button>
                            </div>
                        )}

                        {errors.category && <span className="error-message">{errors.category}</span>}
                    </div>

                    {/* Photos */}
                    <div className="form-group">
                        <label>Photos *</label>
                        <div className="photos-section">
                            <button
                                type="button"
                                className="btn-select-photos"
                                onClick={() => setShowCloudinaryBrowser(true)}
                            >
                                📸 Sélectionner des photos depuis Cloudinary
                            </button>

                            {formData.photos.length > 0 && (
                                <div className="selected-photos-preview">
                                    <p>✅ {formData.photos.length} photo(s) sélectionnée(s)</p>
                                    <div className="photos-grid-preview">
                                        {formData.photos.slice(0, 4).map((photo, index) => (
                                            <img
                                                key={photo.id}
                                                src={photo.src}
                                                alt={`Photo ${index + 1}`}
                                                className="photo-preview"
                                            />
                                        ))}
                                        {formData.photos.length > 4 && (
                                            <div className="more-photos">
                                                +{formData.photos.length - 4} autres
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {errors.photos && <span className="error-message">{errors.photos}</span>}
                        </div>
                    </div>

                    {/* Erreur générale */}
                    {errors.submit && (
                        <div className="error-message submit-error">
                            {errors.submit}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-cancel"
                            disabled={isSubmitting}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sauvegarde...' : (album ? 'Modifier' : 'Créer')}
                        </button>
                    </div>
                </form>

                {/* Browser Cloudinary */}
                {showCloudinaryBrowser && (
                    <CloudinaryBrowser
                        onPhotosSelected={handlePhotosSelected}
                        onCancel={() => setShowCloudinaryBrowser(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default AlbumForm;
