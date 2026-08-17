import React from 'react';
import { styles } from '../../views/RefAdmin/styles.js';

export function FiliereModal({ isOpen, isEditing, form, onChange, onSubmit, onClose, error }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>
                    {isEditing ? "Modifier la filière" : "Ajouter une filière"}
                </h3>
                <form onSubmit={onSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Code</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={form.code}
                            onChange={(e) => onChange({ ...form, code: e.target.value })}
                            placeholder="Ex: DEV"
                            autoFocus
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Nom</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={form.nom}
                            onChange={(e) => onChange({ ...form, nom: e.target.value })}
                            placeholder="Ex: Développement"
                        />
                    </div>

                    {error && <p style={styles.errorText}>{error}</p>}

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