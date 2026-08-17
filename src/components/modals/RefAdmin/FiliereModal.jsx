import React from 'react';
import { styles } from '../../views/RefAdmin/styles.js';

export function FiliereModal({ isOpen, isEditing, form, onChange, onSubmit, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>
                    {isEditing ? "Modifier la filière" : "Ajouter une filière"}
                </h3>
                <form onSubmit={onSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Nom</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={form.nom}
                            onChange={(e) => onChange({ ...form, nom: e.target.value })}
                            placeholder="Ex: D2WM"
                            autoFocus
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