import React from 'react';
import { styles } from '../../views/RefAdmin/styles.js';

export function FiliereAddModal({ isOpen, cursusList, form, onChange, onSubmit, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Ajouter une filière</h3>
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
                    <div style={styles.field}>
                        <label style={styles.label}>Cursus</label>
                        {cursusList.length === 0 ? (
                            <p style={styles.emptyText}>
                                Aucun cursus disponible. Crée d'abord un cursus.
                            </p>
                        ) : (
                            <select
                                style={styles.select}
                                value={form.cursus}
                                onChange={(e) => onChange({ ...form, cursus: e.target.value })}
                            >
                                <option value="">— Sélectionner —</option>
                                {cursusList.map((c) => (
                                    <option key={c.id} value={c.nom}>
                                        {c.nom}
                                    </option>
                                ))}
                            </select>
                        )}
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