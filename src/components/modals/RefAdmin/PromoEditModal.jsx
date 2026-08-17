import React from 'react';
import { styles } from '../../views/RefAdmin/styles.js';

export function PromoEditModal({ isOpen, form, onChange, onSubmit, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Modifier la promotion</h3>
                <form onSubmit={onSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Nom</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={form.nom}
                            onChange={(e) => onChange({ ...form, nom: e.target.value })}
                        />
                    </div>
                    <label style={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            checked={form.enCours}
                            onChange={(e) => onChange({ ...form, enCours: e.target.checked })}
                        />
                        Promotion en cours
                    </label>
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