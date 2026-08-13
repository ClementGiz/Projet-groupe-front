import React from 'react';
import { styles } from './styles';

export function EleveAddModal({
                                  isOpen,
                                  formations,
                                  selectedFormation,
                                  form,
                                  onFormationChange,
                                  onChange,
                                  onSubmit,
                                  onClose,
                              }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Ajouter un élève</h3>

                {formations.length === 0 ? (
                    <p style={styles.emptyText}>
                        Aucune formation existante. Crée d'abord une formation.
                    </p>
                ) : !selectedFormation || selectedFormation.promotions.length === 0 ? (
                    <>
                        <div style={styles.field}>
                            <label style={styles.label}>Formation</label>
                            <select style={styles.select} value={form.formationId} onChange={onFormationChange}>
                                {formations.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p style={styles.emptyText}>
                            Cette formation n'a aucune promotion. Ajoute d'abord une promotion.
                        </p>
                        <div style={styles.modalActions}>
                            <button style={styles.cancelButton} onClick={onClose}>
                                Fermer
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div style={styles.field}>
                            <label style={styles.label}>Formation</label>
                            <select style={styles.select} value={form.formationId} onChange={onFormationChange}>
                                {formations.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Promotion</label>
                            <select
                                style={styles.select}
                                value={form.promoIndex}
                                onChange={(e) => onChange({ ...form, promoIndex: e.target.value })}
                            >
                                {selectedFormation.promotions.map((p, idx) => (
                                    <option key={p.nom} value={idx}>
                                        {p.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Nom de l'élève</label>
                            <input
                                style={styles.input}
                                type="text"
                                value={form.nom}
                                onChange={(e) => onChange({ ...form, nom: e.target.value })}
                                placeholder="Ex: Prénom Nom"
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