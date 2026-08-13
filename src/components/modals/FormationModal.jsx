import React from 'react';
import { styles } from './styles';

export function FormationModal({ isOpen, isEditing, form, onChange, onSubmit, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>
                    {isEditing ? "Modifier la formation" : "Ajouter une formation"}
                </h3>
                <form onSubmit={onSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Nom</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="nom"
                            value={form.nom}
                            onChange={onChange}
                            placeholder="Ex: BUT INFO"
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Cursus</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="cursus"
                            value={form.cursus}
                            onChange={onChange}
                            placeholder="Ex: Data Science"
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Promotions (séparées par virgule)</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="promotions"
                            value={form.promotions}
                            onChange={onChange}
                            placeholder="Ex: PROMO2026, PROMO2025"
                        />
                    </div>
                    <div style={styles.modalActions}>
                        <button type="button" style={styles.cancelButton} onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" style={styles.submitButton}>
                            {isEditing ? "Enregistrer" : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}