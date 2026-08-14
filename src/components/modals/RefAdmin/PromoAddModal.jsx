import React from 'react';
import { styles } from '../views/RefAdmin/styles.js';

export function PromoAddModal({ isOpen, formations, form, onChange, onSubmit, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Ajouter une promotion</h3>
                {formations.length === 0 ? (
                    <p style={styles.emptyText}>
                        Aucune formation existante. Crée d'abord une formation.
                    </p>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div style={styles.field}>
                            <label style={styles.label}>Formation</label>
                            <select
                                style={styles.select}
                                value={form.formationId}
                                onChange={(e) => onChange({ ...form, formationId: e.target.value })}
                            >
                                {formations.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Nom de la promotion</label>
                            <input
                                style={styles.input}
                                type="text"
                                value={form.nom}
                                onChange={(e) => onChange({ ...form, nom: e.target.value })}
                                placeholder="Ex: D2WM2027"
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
                )}
            </div>
        </div>
    );
}