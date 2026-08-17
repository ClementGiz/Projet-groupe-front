import React from 'react';
import { styles } from '../../views/RefAdmin/styles.js';

function isEnCours(dateDebut, dateFin) {
    if (!dateDebut || !dateFin) return false;
    const today = new Date();
    return today >= new Date(dateDebut) && today <= new Date(dateFin);
}

export function PromoModal({
                               isOpen,
                               isEditing,
                               filieres,
                               form,
                               onChange,
                               onSubmit,
                               onClose,
                               error,
                               eleves,
                               elevesLoading,
                               onGoToEleves,
                           }) {
    if (!isOpen) return null;

    const enCours = isEnCours(form.date_debut, form.date_fin);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>
                    {isEditing ? "Modifier la promotion" : "Ajouter une promotion"}
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
                            <label style={styles.label}>Nom de la promotion</label>
                            <input
                                style={styles.input}
                                type="text"
                                value={form.nom}
                                onChange={(e) => onChange({ ...form, nom: e.target.value })}
                                placeholder="Ex: DEV - Promo 2027"
                            />
                        </div>

                        <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ ...styles.field, flex: 1 }}>
                                <label style={styles.label}>Date de début</label>
                                <input
                                    style={styles.input}
                                    type="date"
                                    value={form.date_debut}
                                    onChange={(e) => onChange({ ...form, date_debut: e.target.value })}
                                />
                            </div>
                            <div style={{ ...styles.field, flex: 1 }}>
                                <label style={styles.label}>Date de fin</label>
                                <input
                                    style={styles.input}
                                    type="date"
                                    value={form.date_fin}
                                    onChange={(e) => onChange({ ...form, date_fin: e.target.value })}
                                />
                            </div>
                        </div>

                        {form.date_debut && form.date_fin && (
                            <span
                                style={{
                                    ...styles.statusPill,
                                    ...(enCours ? styles.statusActive : styles.statusInactive),
                                }}
                            >
                                {enCours ? "En cours" : "Terminée"}
                            </span>
                        )}

                        {isEditing && (
                            <div style={styles.field}>
                                <label style={styles.label}>Élèves</label>

                                {elevesLoading ? (
                                    <p style={styles.emptyText}>Chargement...</p>
                                ) : !eleves || eleves.length === 0 ? (
                                    <p style={styles.emptyText}>Aucun élève dans cette promotion.</p>
                                ) : (
                                    <ul style={styles.eleveList}>
                                        {eleves.map((e) => (
                                            <li key={e.id} style={styles.eleveItem}>
                                                <span style={{ flex: 1 }}>
                                                    {e.first_name} {e.last_name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <button
                                    type="button"
                                    style={{ ...styles.cancelButton, marginTop: 8 }}
                                    onClick={onGoToEleves}
                                >
                                    Gérer les élèves dans l'onglet Élèves
                                </button>
                            </div>
                        )}

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