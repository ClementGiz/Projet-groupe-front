import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { FiliereModal } from '../../modals/RefAdmin/FiliereModal';
import { CursusModal } from '../../modals/RefAdmin/CursusModal';
import { PromoModal } from '../../modals/RefAdmin/PromoModal';
import {
    getFilieres, createFiliere, updateFiliere,
    getCursusList, createCursus, updateCursus,
    getPromotions, createPromotion, updatePromotion,
    getEleves, updateEleve,
} from '../../../services/refadminService';


const TABS = [
    { key: "filieres", label: "Filières" },
    { key: "cursus", label: "Cursus" },
    { key: "promotions", label: "Promotions" },
    { key: "eleves", label: "Élèves" },
];

const ADD_ACTION_LABELS = {
    filieres: "Ajouter une filière",
    cursus: "Ajouter un cursus",
    promotions: "Ajouter une promotion",
    eleves: null, // pas de création d'élève depuis cette vue
};

const emptyFiliereForm = { code: "", nom: "" };
const emptyCursusForm = { filiere_id: "", code: "", libelle: "" };
const emptyPromoForm = { filiere_id: "", nom: "", date_debut: "", date_fin: "" };

function isEnCours(dateDebut, dateFin) {
    if (!dateDebut || !dateFin) return false;
    const today = new Date();
    return today >= new Date(dateDebut) && today <= new Date(dateFin);
}

export function RefadminView() {
    const [filieres, setFilieres] = useState([]);
    const [cursusList, setCursusList] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [eleves, setEleves] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const [activeTab, setActiveTab] = useState("filieres");

    // --- Filière ---
    const [isFiliereModalOpen, setIsFiliereModalOpen] = useState(false);
    const [editingFiliereId, setEditingFiliereId] = useState(null);
    const [filiereForm, setFiliereForm] = useState(emptyFiliereForm);
    const [filiereError, setFiliereError] = useState(null);

    // --- Cursus ---
    const [isCursusModalOpen, setIsCursusModalOpen] = useState(false);
    const [editingCursusId, setEditingCursusId] = useState(null);
    const [cursusForm, setCursusForm] = useState(emptyCursusForm);
    const [cursusError, setCursusError] = useState(null);

    // --- Promotion ---
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
    const [editingPromoId, setEditingPromoId] = useState(null);
    const [promoForm, setPromoForm] = useState(emptyPromoForm);
    const [promoError, setPromoError] = useState(null);

    // --- Chargement initial ---
    const loadAll = async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const [filieresRes, cursusRes, promotionsRes, elevesRes] = await Promise.all([
                getFilieres(),
                getCursusList(),
                getPromotions(),
                getEleves(),
            ]);
            setFilieres(filieresRes.data);
            setCursusList(cursusRes.data);
            setPromotions(promotionsRes.data);
            setEleves(elevesRes.data);
        } catch (err) {
            setLoadError("Impossible de charger les données. Vérifie que l'API est bien démarrée.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAll();
    }, []);

    // --- Filière : handlers ---
    const openAddFiliereModal = () => {
        setEditingFiliereId(null);
        setFiliereForm(emptyFiliereForm);
        setFiliereError(null);
        setIsFiliereModalOpen(true);
    };

    const openEditFiliereModal = (item) => {
        setEditingFiliereId(item.id);
        setFiliereForm({ code: item.code, nom: item.nom });
        setFiliereError(null);
        setIsFiliereModalOpen(true);
    };

    const closeFiliereModal = () => {
        setIsFiliereModalOpen(false);
        setEditingFiliereId(null);
        setFiliereForm(emptyFiliereForm);
        setFiliereError(null);
    };

    const handleFiliereSubmit = async (e) => {
        e.preventDefault();
        if (!filiereForm.nom.trim() || !filiereForm.code.trim()) return;

        setFiliereError(null);
        try {
            if (editingFiliereId !== null) {
                await updateFiliere(editingFiliereId, filiereForm);
            } else {
                await createFiliere(filiereForm);
            }
            await loadAll();
            closeFiliereModal();
        } catch (err) {
            setFiliereError("Erreur lors de l'enregistrement de la filière.");
        }
    };

    // --- Cursus : handlers ---
    const openAddCursusModal = () => {
        setEditingCursusId(null);
        setCursusForm({ ...emptyCursusForm, filiere_id: filieres[0] ? String(filieres[0].id) : "" });
        setCursusError(null);
        setIsCursusModalOpen(true);
    };

    const openCursusEditModal = (cursusItem) => {
        setEditingCursusId(cursusItem.id);
        setCursusForm({
            filiere_id: String(cursusItem.filiere?.id ?? ""),
            code: cursusItem.code,
            libelle: cursusItem.libelle,
        });
        setCursusError(null);
        setIsCursusModalOpen(true);
    };

    const closeCursusModal = () => {
        setIsCursusModalOpen(false);
        setEditingCursusId(null);
        setCursusForm(emptyCursusForm);
        setCursusError(null);
    };

    const handleCursusSubmit = async (e) => {
        e.preventDefault();
        if (!cursusForm.libelle.trim() || !cursusForm.code.trim() || !cursusForm.filiere_id) return;

        setCursusError(null);
        try {
            if (editingCursusId !== null) {
                await updateCursus(editingCursusId, cursusForm);
            } else {
                await createCursus(cursusForm);
            }
            await loadAll();
            closeCursusModal();
        } catch (err) {
            setCursusError("Erreur lors de l'enregistrement du cursus.");
        }
    };

    // --- Promotion : handlers ---
    const openAddPromoModal = () => {
        setEditingPromoId(null);
        setPromoForm({ ...emptyPromoForm, filiere_id: filieres[0] ? String(filieres[0].id) : "" });
        setPromoError(null);
        setIsPromoModalOpen(true);
    };

    const openPromoEditModal = (promo) => {
        setEditingPromoId(promo.id);
        setPromoForm({
            filiere_id: String(promo.filiere?.id ?? ""),
            nom: promo.nom,
            date_debut: promo.date_debut,
            date_fin: promo.date_fin,
        });
        setPromoError(null);
        setIsPromoModalOpen(true);
    };

    const closePromoModal = () => {
        setIsPromoModalOpen(false);
        setEditingPromoId(null);
        setPromoForm(emptyPromoForm);
        setPromoError(null);
    };

    const handlePromoSubmit = async (e) => {
        e.preventDefault();
        if (!promoForm.nom.trim() || !promoForm.filiere_id || !promoForm.date_debut || !promoForm.date_fin) return;

        setPromoError(null);
        try {
            if (editingPromoId !== null) {
                await updatePromotion(editingPromoId, promoForm);
            } else {
                await createPromotion(promoForm);
            }
            await loadAll();
            closePromoModal();
        } catch (err) {
            setPromoError("Erreur lors de l'enregistrement de la promotion.");
        }
    };

    // --- Élèves : réassignation de promotion ---
    const handleReassignEleve = async (eleveId, promotionId) => {
        if (!promotionId) return;
        try {
            await updateEleve(eleveId, { promotion_id: promotionId });
            await loadAll();
        } catch (err) {
            // silencieux ici, on pourrait ajouter un message d'erreur global si besoin
        }
    };

    // --- Bouton "+" contextuel ---
    const handleAddButtonClick = () => {
        switch (activeTab) {
            case "cursus":
                openAddCursusModal();
                break;
            case "promotions":
                openAddPromoModal();
                break;
            case "filieres":
                openAddFiliereModal();
                break;
            default:
                break;
        }
    };

    // --- Données pour le modal Promo (élèves déjà chargés) ---
    const editingPromoEleves = editingPromoId !== null
        ? eleves.filter((e) => e.eleve_profile?.promotion?.id === editingPromoId)
        : [];

    // --- Rendu du tableau selon l'onglet actif ---
    const renderTable = () => {
        switch (activeTab) {
            case "filieres":
                return (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>Code</th>
                            <th style={styles.th}>Nom</th>
                            <th style={styles.th}>Nb promotions</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filieres.length === 0 ? (
                            <tr><td style={styles.td} colSpan={4}>Aucune filière enregistrée.</td></tr>
                        ) : (
                            filieres.map((f) => (
                                <tr key={f.id}>
                                    <td style={styles.td}>{f.code}</td>
                                    <td style={styles.td}>{f.nom}</td>
                                    <td style={styles.td}>
                                        {promotions.filter((p) => p.filiere?.id === f.id).length}
                                    </td>
                                    <td style={styles.actionTd}>
                                        <button style={styles.editButton} onClick={() => openEditFiliereModal(f)} title="Modifier">
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                );

            case "cursus":
                return (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>Code</th>
                            <th style={styles.th}>Libellé</th>
                            <th style={styles.th}>Filière</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cursusList.length === 0 ? (
                            <tr><td style={styles.td} colSpan={4}>Aucun cursus enregistré.</td></tr>
                        ) : (
                            cursusList.map((c) => (
                                <tr key={c.id}>
                                    <td style={styles.td}>{c.code}</td>
                                    <td style={styles.td}>{c.libelle}</td>
                                    <td style={styles.td}>{c.filiere?.nom}</td>
                                    <td style={styles.actionTd}>
                                        <button style={styles.editButton} onClick={() => openCursusEditModal(c)} title="Modifier">
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                );

            case "promotions":
                return (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>Promotion</th>
                            <th style={styles.th}>Filière</th>
                            <th style={styles.th}>Dates</th>
                            <th style={styles.th}>Statut</th>
                            <th style={styles.th}>Élèves</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {promotions.length === 0 ? (
                            <tr><td style={styles.td} colSpan={6}>Aucune promotion enregistrée.</td></tr>
                        ) : (
                            promotions.map((p) => {
                                const enCours = isEnCours(p.date_debut, p.date_fin);
                                const nbEleves = eleves.filter((e) => e.eleve_profile?.promotion?.id === p.id).length;
                                return (
                                    <tr key={p.id}>
                                        <td style={styles.td}>{p.nom}</td>
                                        <td style={styles.td}>{p.filiere?.nom}</td>
                                        <td style={styles.td}>{p.date_debut} → {p.date_fin}</td>
                                        <td style={styles.td}>
                                            <span
                                                style={{
                                                    ...styles.statusPill,
                                                    ...(enCours ? styles.statusActive : styles.statusInactive),
                                                }}
                                            >
                                                {enCours ? "En cours" : "Terminée"}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span
                                                style={styles.badge}
                                                onClick={() => openPromoEditModal(p)}
                                                title="Voir / gérer les élèves"
                                            >
                                                Voir
                                                <span style={styles.badgeCount}>{nbEleves}</span>
                                            </span>
                                        </td>
                                        <td style={styles.actionTd}>
                                            <button style={styles.editButton} onClick={() => openPromoEditModal(p)} title="Modifier">
                                                ✏️
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>
                );

            case "eleves":
                return (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>Nom</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Promotion actuelle</th>
                            <th style={styles.th}>Réassigner</th>
                        </tr>
                        </thead>
                        <tbody>
                        {eleves.length === 0 ? (
                            <tr><td style={styles.td} colSpan={4}>Aucun élève enregistré.</td></tr>
                        ) : (
                            eleves.map((e) => (
                                <tr key={e.id}>
                                    <td style={styles.td}>{e.first_name} {e.last_name}</td>
                                    <td style={styles.td}>{e.email}</td>
                                    <td style={styles.td}>{e.eleve_profile?.promotion?.nom ?? "—"}</td>
                                    <td style={styles.td}>
                                        <select
                                            style={styles.select}
                                            value={e.eleve_profile?.promotion?.id ?? ""}
                                            onChange={(ev) => handleReassignEleve(e.id, ev.target.value)}
                                        >
                                            <option value="" disabled>— Changer de promotion —</option>
                                            {promotions.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return <div style={styles.section}>Chargement...</div>;
    }

    if (loadError) {
        return (
            <div style={styles.section}>
                <p style={styles.errorText}>{loadError}</p>
                <button style={styles.submitButton} onClick={loadAll}>Réessayer</button>
            </div>
        );
    }

    return (
        <div>
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <div style={styles.tabsRow}>
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                style={{
                                    ...styles.tabButton,
                                    ...(activeTab === tab.key ? styles.tabButtonActive : {}),
                                }}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {ADD_ACTION_LABELS[activeTab] && (
                        <button
                            style={styles.addIconButton}
                            onClick={handleAddButtonClick}
                            title={ADD_ACTION_LABELS[activeTab]}
                        >
                            +
                        </button>
                    )}
                </div>

                {renderTable()}
            </div>

            <FiliereModal
                isOpen={isFiliereModalOpen}
                isEditing={editingFiliereId !== null}
                form={filiereForm}
                onChange={setFiliereForm}
                onSubmit={handleFiliereSubmit}
                onClose={closeFiliereModal}
                error={filiereError}
            />

            <CursusModal
                isOpen={isCursusModalOpen}
                isEditing={editingCursusId !== null}
                filieres={filieres}
                form={cursusForm}
                onChange={setCursusForm}
                onSubmit={handleCursusSubmit}
                onClose={closeCursusModal}
                error={cursusError}
            />

            <PromoModal
                isOpen={isPromoModalOpen}
                isEditing={editingPromoId !== null}
                filieres={filieres}
                form={promoForm}
                onChange={setPromoForm}
                onSubmit={handlePromoSubmit}
                onClose={closePromoModal}
                error={promoError}
                eleves={editingPromoEleves}
                elevesLoading={false}
                onGoToEleves={() => {
                    closePromoModal();
                    setActiveTab("eleves");
                }}
            />
        </div>
    );
}