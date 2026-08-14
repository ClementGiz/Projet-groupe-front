import React, { useState } from 'react';
import { styles } from '../../views/RefAdmin/styles.js';

export function PromoModal({
                               isOpen,
                               isEditing,
                               formations,
                               cursusList,
                               form,
                               onChange,
                               onSubmit,
                               onClose,
                           }) {
    const [newEleve, setNewEleve] = useState("");

    if (!isOpen) return null;

    const handleAddEleve = () => {
        if (!newEleve.trim()) return;
        onChange({ ...form, eleves: [...form.eleves, newEleve.trim()] });
        setNewEleve("");
    };

    const handleRemoveEleve = (index) => {
        onChange({ ...form, eleves: form.eleves.filter((_, i) => i !== index) });
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>
                    {isEditing ? "Modifier la promotion" : "Ajouter une promotion"}
                </h3>

                {formations.length === 0 ? (
                    <p style={styles.emptyText}>
                        Aucune filière existante. Crée d'abord une filière.
                    </p>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div style={styles.field}>
                            <label style={styles.label}>Filière</label>
                            <select
                                style={styles.select}
                                value={form.formationId}
                                onChange={(e) => onChange({ ...form, formationId: e.target.value })}
                            >
                                <option value="">— Sélectionner —</option>
                                {formations.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nom}
                                    </option>
                                ))}
                            </select>
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

                        <label style={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={form.enCours}
                                onChange={(e) => onChange({ ...form, enCours: e.target.checked })}
                            />
                            Promotion en cours
                        </label>

                        <div style={styles.field}>
                            <label style={styles.label}>Élèves</label>

                            {form.eleves.length === 0 ? (
                                <p style={styles.emptyText}>Aucun élève pour le moment.</p>
                            ) : (
                                <ul style={styles.eleveList}>
                                    {form.eleves.map((eleve, idx) => (
                                        <li key={idx} style={styles.eleveItem}>
                                            <span style={{ flex: 1 }}>{eleve}</span>
                                            <button
                                                type="button"
                                                style={styles.removeEleveButton}
                                                onClick={() => handleRemoveEleve(idx)}
                                            >
                                                Retirer
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                <input
                                    style={{ ...styles.input, flex: 1 }}
                                    type="text"
                                    value={newEleve}
                                    onChange={(e) => setNewEleve(e.target.value)}
                                    placeholder="Nom de l'élève"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleAddEleve();
                                        }
                                    }}
                                />
                                <button type="button" style={styles.cancelButton} onClick={handleAddEleve}>
                                    + Ajouter
                                </button>
                            </div>
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
                )}
            </div>
        </div>
    );
}