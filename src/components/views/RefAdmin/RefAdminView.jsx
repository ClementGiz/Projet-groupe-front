import React, { useState } from 'react';
import { styles } from './styles';
import { FiliereModal } from '../../modals/RefAdmin/FiliereModal';
import { CursusModal } from '../../modals/RefAdmin/CursusModal';
import { PromoModal } from '../../modals/RefAdmin/PromoModal';

// --- Données initiales ---

const initialFilieres = [
    { id: 1, nom: "D2WM" },
    { id: 2, nom: "EADL" },
    { id: 3, nom: "CDA" },
    { id: 4, nom: "TSSR" },
];

const initialCursusList = [
    { id: 1, nom: "Web Development" },
    { id: 2, nom: "Full-Stack Development" },
    { id: 3, nom: "DevOps" },
    { id: 4, nom: "Infrastructure" },
];

const initialPromotions = [
    {
        id: 1,
        formationId: 1,
        cursus: "Web Development",
        nom: "D2WM2026",
        enCours: true,
        eleves: ["Alice Dupont", "Karim Benali"],
    },
    {
        id: 2,
        formationId: 1,
        cursus: "Web Development",
        nom: "D2WM2025",
        enCours: false,
        eleves: ["Julie Martin"],
    },
    {
        id: 3,
        formationId: 2,
        cursus: "Full-Stack Development",
        nom: "CDA2026",
        enCours: true,
        eleves: [],
    },
    {
        id: 4,
        formationId: 2,
        cursus: "Full-Stack Development",
        nom: "CDA2025",
        enCours: false,
        eleves: ["Léo Fabre"],
    },
    {
        id: 5,
        formationId: 3,
        cursus: "DevOps",
        nom: "EADL2026",
        enCours: true,
        eleves: [],
    },
    {
        id: 6,
        formationId: 3,
        cursus: "DevOps",
        nom: "EADL2025",
        enCours: false,
        eleves: [],
    },
    {
        id: 7,
        formationId: 4,
        cursus: "Infrastructure",
        nom: "TSSR2026",
        enCours: true,
        eleves: [],
    },
    {
        id: 8,
        formationId: 4,
        cursus: "Infrastructure",
        nom: "TSSR2025",
        enCours: false,
        eleves: [],
    },
];

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
    eleves: "Ajouter un élève",
};

const emptyFiliereForm = { nom: "" };
const emptyPromoForm = { formationId: "", cursus: "", nom: "", enCours: false, eleves: [] };

export function RefadminView() {
    const [filieres, setFilieres] = useState(initialFilieres);
    const [cursusList, setCursusList] = useState(initialCursusList);
    const [promotions, setPromotions] = useState(initialPromotions);
    const [activeTab, setActiveTab] = useState("filieres");

    // --- Filière (ajout / édition) ---
    const [isFiliereModalOpen, setIsFiliereModalOpen] = useState(false);
    const [editingFiliereId, setEditingFiliereId] = useState(null);
    const [filiereForm, setFiliereForm] = useState(emptyFiliereForm);

    // --- Cursus (ajout / édition) ---
    const [isCursusModalOpen, setIsCursusModalOpen] = useState(false);
    const [editingCursusId, setEditingCursusId] = useState(null);
    const [cursusForm, setCursusForm] = useState({ nom: "" });

    // --- Promotion (ajout / édition, inclut la gestion des élèves) ---
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
    const [editingPromoId, setEditingPromoId] = useState(null); // null si ajout
    const [promoForm, setPromoForm] = useState(emptyPromoForm);

    // --- Filière : handlers ---
    const openAddFiliereModal = () => {
        setEditingFiliereId(null);
        setFiliereForm(emptyFiliereForm);
        setIsFiliereModalOpen(true);
    };

    const openEditFiliereModal = (item) => {
        setEditingFiliereId(item.id);
        setFiliereForm({ nom: item.nom });
        setIsFiliereModalOpen(true);
    };

    const closeFiliereModal = () => {
        setIsFiliereModalOpen(false);
        setEditingFiliereId(null);
        setFiliereForm(emptyFiliereForm);
    };

    const handleFiliereSubmit = (e) => {
        e.preventDefault();
        if (!filiereForm.nom.trim()) return;

        if (editingFiliereId !== null) {
            setFilieres(
                filieres.map((item) =>
                    item.id === editingFiliereId ? { ...item, nom: filiereForm.nom.trim() } : item
                )
            );
        } else {
            const newEntry = {
                id: filieres.length ? Math.max(...filieres.map((f) => f.id)) + 1 : 1,
                nom: filiereForm.nom.trim(),
            };
            setFilieres([...filieres, newEntry]);
        }

        closeFiliereModal();
    };

    // --- Cursus : handlers ---
    const openAddCursusModal = () => {
        setEditingCursusId(null);
        setCursusForm({ nom: "" });
        setIsCursusModalOpen(true);
    };

    const openCursusEditModal = (cursusItem) => {
        setEditingCursusId(cursusItem.id);
        setCursusForm({ nom: cursusItem.nom });
        setIsCursusModalOpen(true);
    };

    const closeCursusModal = () => {
        setIsCursusModalOpen(false);
        setEditingCursusId(null);
        setCursusForm({ nom: "" });
    };

    const handleCursusSubmit = (e) => {
        e.preventDefault();
        if (!cursusForm.nom.trim()) return;

        if (editingCursusId !== null) {
            setCursusList(
                cursusList.map((c) =>
                    c.id === editingCursusId ? { ...c, nom: cursusForm.nom.trim() } : c
                )
            );
        } else {
            const newCursus = {
                id: cursusList.length ? Math.max(...cursusList.map((c) => c.id)) + 1 : 1,
                nom: cursusForm.nom.trim(),
            };
            setCursusList([...cursusList, newCursus]);
        }

        closeCursusModal();
    };

    // --- Promotion : handlers ---
    const openAddPromoModal = () => {
        setEditingPromoId(null);
        setPromoForm({
            formationId: filieres[0] ? String(filieres[0].id) : "",
            cursus: "",
            nom: "",
            enCours: false,
            eleves: [],
        });
        setIsPromoModalOpen(true);
    };

    const openPromoEditModal = (promoId) => {
        const promo = promotions.find((p) => p.id === promoId);
        if (!promo) return;
        setEditingPromoId(promoId);
        setPromoForm({
            formationId: String(promo.formationId),
            cursus: promo.cursus,
            nom: promo.nom,
            enCours: promo.enCours,
            eleves: [...promo.eleves],
        });
        setIsPromoModalOpen(true);
    };

    const closePromoModal = () => {
        setIsPromoModalOpen(false);
        setEditingPromoId(null);
        setPromoForm(emptyPromoForm);
    };

    const handlePromoSubmit = (e) => {
        e.preventDefault();
        if (!promoForm.nom.trim() || !promoForm.formationId) return;

        if (editingPromoId !== null) {
            setPromotions(
                promotions.map((p) =>
                    p.id === editingPromoId
                        ? {
                            ...p,
                            formationId: Number(promoForm.formationId),
                            cursus: promoForm.cursus,
                            nom: promoForm.nom.trim(),
                            enCours: promoForm.enCours,
                            eleves: promoForm.eleves,
                        }
                        : p
                )
            );
        } else {
            const newPromo = {
                id: promotions.length ? Math.max(...promotions.map((p) => p.id)) + 1 : 1,
                formationId: Number(promoForm.formationId),
                cursus: promoForm.cursus,
                nom: promoForm.nom.trim(),
                enCours: promoForm.enCours,
                eleves: promoForm.eleves,
            };
            setPromotions([...promotions, newPromo]);
        }

        closePromoModal();
    };

    const toggleEnCours = (promoId) => {
        setPromotions(
            promotions.map((p) => (p.id === promoId ? { ...p, enCours: !p.enCours } : p))
        );
    };

    // --- Bouton "+" contextuel ---
    const handleAddButtonClick = () => {
        switch (activeTab) {
            case "cursus":
                openAddCursusModal();
                break;
            case "promotions":
            case "eleves":
                openAddPromoModal();
                break;
            case "filieres":
            default:
                openAddFiliereModal();
                break;
        }
    };

    // --- Données dérivées ---
    const filiereNom = (formationId) =>
        filieres.find((f) => f.id === formationId)?.nom ?? "—";

    const allPromotions = promotions.map((p) => ({
        ...p,
        filiere: filiereNom(p.formationId),
    }));

    const allEleves = promotions.flatMap((p) =>
        p.eleves.map((eleve, eleveIndex) => ({
            promoId: p.id,
            eleveIndex,
            nom: eleve,
            promotion: p.nom,
            filiere: filiereNom(p.formationId),
        }))
    );

    // --- Rendu du tableau selon l'onglet actif ---
    const renderTable = () => {
        switch (activeTab) {
            case "filieres":
                return (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Nom</th>
                            <th style={styles.th}>Nb promotions</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filieres.map((f) => (
                            <tr key={f.id}>
                                <td style={styles.td}>{f.id}</td>
                                <td style={styles.td}>{f.nom}</td>
                                <td style={styles.td}>
                                    {promotions.filter((p) => p.formationId === f.id).length}
                                </td>
                                <td style={styles.actionTd}>
                                    <button
                                        style={styles.editButton}
                                        onClick={() => openEditFiliereModal(f)}
                                        title="Modifier"
                                    >
                                        ✏️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );

            case "cursus":
                return (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Nom</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cursusList.length === 0 ? (
                            <tr>
                                <td style={styles.td} colSpan={3}>
                                    Aucun cursus enregistré.
                                </td>
                            </tr>
                        ) : (
                            cursusList.map((c) => (
                                <tr key={c.id}>
                                    <td style={styles.td}>{c.id}</td>
                                    <td style={styles.td}>{c.nom}</td>
                                    <td style={styles.actionTd}>
                                        <button
                                            style={styles.editButton}
                                            onClick={() => openCursusEditModal(c)}
                                            title="Modifier"
                                        >
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
                            <th style={styles.th}>Cursus</th>
                            <th style={styles.th}>Statut</th>
                            <th style={styles.th}>Élèves</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {allPromotions.length === 0 ? (
                            <tr>
                                <td style={styles.td} colSpan={6}>
                                    Aucune promotion enregistrée.
                                </td>
                            </tr>
                        ) : (
                            allPromotions.map((p) => (
                                <tr key={p.id}>
                                    <td style={styles.td}>{p.nom}</td>
                                    <td style={styles.td}>{p.filiere}</td>
                                    <td style={styles.td}>{p.cursus}</td>
                                    <td style={styles.td}>
                                        <button
                                            style={{
                                                ...styles.statusPill,
                                                ...(p.enCours ? styles.statusActive : styles.statusInactive),
                                            }}
                                            onClick={() => toggleEnCours(p.id)}
                                            title="Cliquer pour changer le statut"
                                        >
                                            {p.enCours ? "En cours" : "Terminée"}
                                        </button>
                                    </td>
                                    <td style={styles.td}>
                      <span
                          style={styles.badge}
                          onClick={() => openPromoEditModal(p.id)}
                          title="Voir / gérer les élèves"
                      >
                        Voir
                        <span style={styles.badgeCount}>{p.eleves.length}</span>
                      </span>
                                    </td>
                                    <td style={styles.actionTd}>
                                        <button
                                            style={styles.editButton}
                                            onClick={() => openPromoEditModal(p.id)}
                                            title="Modifier"
                                        >
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))
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
                            <th style={styles.th}>Promotion</th>
                            <th style={styles.th}>Filière</th>
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {allEleves.length === 0 ? (
                            <tr>
                                <td style={styles.td} colSpan={4}>
                                    Aucun élève enregistré.
                                </td>
                            </tr>
                        ) : (
                            allEleves.map((e) => (
                                <tr key={`${e.promoId}-${e.eleveIndex}`}>
                                    <td style={styles.td}>{e.nom}</td>
                                    <td style={styles.td}>{e.promotion}</td>
                                    <td style={styles.td}>{e.filiere}</td>
                                    <td style={styles.actionTd}>
                                        <button
                                            style={styles.editButton}
                                            onClick={() => openPromoEditModal(e.promoId)}
                                            title="Modifier (via la promotion)"
                                        >
                                            ✏️
                                        </button>
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
                    <button
                        style={styles.addIconButton}
                        onClick={handleAddButtonClick}
                        title={ADD_ACTION_LABELS[activeTab]}
                    >
                        +
                    </button>
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
            />

            <CursusModal
                isOpen={isCursusModalOpen}
                isEditing={editingCursusId !== null}
                form={cursusForm}
                onChange={setCursusForm}
                onSubmit={handleCursusSubmit}
                onClose={closeCursusModal}
            />

            <PromoModal
                isOpen={isPromoModalOpen}
                isEditing={editingPromoId !== null}
                formations={filieres}
                cursusList={cursusList}
                form={promoForm}
                onChange={setPromoForm}
                onSubmit={handlePromoSubmit}
                onClose={closePromoModal}
            />
        </div>
    );
}