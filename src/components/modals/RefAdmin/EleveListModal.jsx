import React from 'react';
import { styles } from '../views/RefAdmin/styles.js';

export function EleveListModal({
                                   isOpen,
                                   promo,
                                   newEleve,
                                   onNewEleveChange,
                                   onAddEleve,
                                   onRemoveEleve,
                                   onToggleEnCours,
                                   onClose,
                               }) {
    if (!isOpen || !promo) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Élèves — {promo.nom}</h3>

                <label style={styles.checkboxRow}>
                    <input type="checkbox" checked={promo.enCours} onChange={onToggleEnCours} />
                    Promotion en cours
                </label>

                {promo.eleves.length === 0 ? (
                    <p style={styles.emptyText}>Aucun élève pour le moment.</p>
                ) : (
                    <ul style={styles.eleveList}>
                        {promo.eleves.map((eleve, idx) => (
                            <li key={idx} style={styles.eleveItem}>
                                {eleve}
                                <button style={styles.removeEleveButton} onClick={() => onRemoveEleve(idx)}>
                                    Retirer
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <form onSubmit={onAddEleve} style={styles.addEleveRow}>
                    <input
                        style={{ ...styles.input, flex: 1 }}
                        type="text"
                        value={newEleve}
                        onChange={(e) => onNewEleveChange(e.target.value)}
                        placeholder="Nom de l'élève"
                    />
                    <button type="submit" style={styles.submitButton}>
                        Ajouter
                    </button>
                </form>

                <div style={styles.modalActions}>
                    <button style={styles.cancelButton} onClick={onClose}>
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}