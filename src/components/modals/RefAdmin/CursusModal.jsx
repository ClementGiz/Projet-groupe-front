import React from 'react';
import { styles } from '../../views/RefAdmin/styles.js';

export function CursusModal({ isOpen, isEditing, filieres, form, onChange, onSubmit, onClose, error }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>
                    {isEditing ? "Modifier le cursus" : "Ajouter un cursus"}
                </h3>

                {filieres.length === 0 ? (
                    <p style={styles.emptyText}>
                        Aucune filière existante. Crée d'abord une filière.
                    </p>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div style={styles.field}>
                            <label style={styles.label}>Filière</label>
                            <select
                                style={styles.select}
                                value={form.filiere_id}
                                onChange={(e) => onChange({ ...form, filiere_id: e.target.value })}
                            >
                                <option value="">— Sélectionner —</option>
                                {filieres.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Code</label>
                            <input
                                style={styles.input}
                                type="text"
                                value={form.code}
                                onChange={(e) => onChange({ ...form, code: e.target.value })}
                                placeholder="Ex: CDA"
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Libellé</label>
                            <input
                                style={styles.input}
                                type="text"
                                value={form.libelle}
                                onChange={(e) => onChange({ ...form, libelle: e.target.value })}
                                placeholder="Ex: Concepteur Développeur d'Applications"
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
                )}
            </div>
        </div>
    );
}