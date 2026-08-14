import React from 'react';
import { styles } from '../views/RefAdmin/styles.js';

export function EleveEditModal({ isOpen, name, onChange, onSubmit, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Modifier l'élève</h3>
                <form onSubmit={onSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Nom</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={name}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                    <div style={styles.modalActions}>
                        <button type="button" style={styles.cancelButton} onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" style={styles.submitButton}>
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}