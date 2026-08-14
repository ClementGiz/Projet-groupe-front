import React from 'react';
import { styles } from '../views/RefAdmin/styles.js';

export function CursusAddModal({ isOpen, form, onChange, onSubmit, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Ajouter un cursus</h3>
                <form onSubmit={onSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Nom du cursus</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={form.nom}
                            onChange={(e) => onChange({ nom: e.target.value })}
                            placeholder="Ex: Data Science"
                            autoFocus
                        />
                    </div>
                    <div style={styles.modalActions}>
                        <button type="button" style={styles.cancelButton} onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" style={styles.submitButton}>
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}