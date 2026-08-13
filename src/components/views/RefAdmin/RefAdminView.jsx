import React, { useState } from 'react';

const CURRENT_YEAR = "2026";

const initialProps = [
    {
        id: 1,
        nom: "D2WM",
        cursus: "Web Development",
        promotions: [
            { nom: "D2WM2026", enCours: true, eleves: ["Alice Dupont", "Karim Benali"] },
            { nom: "D2WM2025", enCours: false, eleves: ["Julie Martin"] },
        ],
    },
    {
        id: 2,
        nom: "EADL",
        cursus: "Full-Stack Development",
        promotions: [
            { nom: "CDA2026", enCours: true, eleves: [] },
            { nom: "CDA2025", enCours: false, eleves: ["Léo Fabre"] },
        ],
    },
    {
        id: 3,
        nom: "CDA",
        cursus: "DevOps",
        promotions: [
            { nom: "EADL2026", enCours: true, eleves: [] },
            { nom: "EADL2025", enCours: false, eleves: [] },
        ],
    },
    {
        id: 4,
        nom: "TSSR",
        cursus: "Infrastructure",
        promotions: [
            { nom: "TSSR2026", enCours: true, eleves: [] },
            { nom: "TSSR2025", enCours: false, eleves: [] },
        ],
    },
];

const initialCursusList = [
    { id: 1, nom: "Web Development" },
    { id: 2, nom: "Full-Stack Development" },
    { id: 3, nom: "DevOps" },
    { id: 4, nom: "Infrastructure" },
];

const TABS = [
    { key: "filieres", label: "Filières" },
    { key: "cursus", label: "Cursus" },
    { key: "promotions", label: "Promotions" },
    { key: "eleves", label: "Élèves" },
];

const ADD_ACTION_LABELS = {
    filieres: "Ajouter une formation",
    cursus: "Ajouter un cursus",
    promotions: "Ajouter une promotion",
    eleves: "Ajouter un élève",
};

const styles = {
    section: { marginBottom: 20 },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
        flexWrap: "wrap",
        gap: 12,
    },
    tabsRow: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
    },
    tabButton: {
        padding: "7px 14px",
        borderRadius: 999,
        border: "1px solid #d1d5db",
        backgroundColor: "#fff",
        color: "#374151",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "system-ui, sans-serif",
    },
    tabButtonActive: {
        backgroundColor: "#2563eb",
        borderColor: "#2563eb",
        color: "#fff",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "system-ui, sans-serif",
        fontSize: 14,
    },
    th: {
        padding: "10px 14px",
        textAlign: "left",
        borderBottom: "2px solid #ccc",
        backgroundColor: "#f5f5f5",
        fontWeight: 600,
        textTransform: "uppercase",
        fontSize: 12,
        letterSpacing: "0.03em",
    },
    td: {
        padding: "10px 14px",
        textAlign: "left",
        borderBottom: "1px solid #e0e0e0",
        verticalAlign: "top",
    },
    actionTd: {
        padding: "10px 14px",
        textAlign: "center",
        borderBottom: "1px solid #e0e0e0",
        width: 40,
        verticalAlign: "top",
    },
    editButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 15,
        padding: 4,
        borderRadius: 4,
    },
    addIconButton: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#2563eb",
        color: "#fff",
        fontSize: 18,
        lineHeight: "30px",
        textAlign: "center",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
    },
    promoBadges: {
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
    },
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 10px",
        backgroundColor: "#eef2ff",
        color: "#3730a3",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        border: "1px solid #c7d2fe",
    },
    badgeCount: {
        backgroundColor: "#3730a3",
        color: "#fff",
        borderRadius: 999,
        fontSize: 11,
        padding: "1px 6px",
    },
    emptyBadgeNote: {
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
    },
    statusPill: {
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
    },
    statusActive: { backgroundColor: "#dcfce7", color: "#166534" },
    statusInactive: { backgroundColor: "#f3f4f6", color: "#6b7280" },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 24,
        width: 360,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        fontFamily: "system-ui, sans-serif",
    },
    modalTitle: {
        margin: "0 0 16px 0",
        fontSize: 16,
        fontWeight: 600,
    },
    field: {
        marginBottom: 12,
        display: "flex",
        flexDirection: "column",
        gap: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: 600,
        color: "#555",
    },
    input: {
        padding: "8px 10px",
        border: "1px solid #ccc",
        borderRadius: 4,
        fontSize: 14,
    },
    select: {
        padding: "8px 10px",
        border: "1px solid #ccc",
        borderRadius: 4,
        fontSize: 14,
        backgroundColor: "#fff",
    },
    checkboxRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
        fontSize: 14,
    },
    modalActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 16,
    },
    cancelButton: {
        padding: "8px 14px",
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
    },
    submitButton: {
        padding: "8px 14px",
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
    },
    eleveList: {
        listStyle: "none",
        margin: "0 0 16px 0",
        padding: 0,
        maxHeight: 180,
        overflowY: "auto",
    },
    eleveItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 4px",
        borderBottom: "1px solid #f0f0f0",
        fontSize: 14,
    },
    removeEleveButton: {
        background: "none",
        border: "none",
        color: "#b91c1c",
        cursor: "pointer",
        fontSize: 13,
    },
    addEleveRow: {
        display: "flex",
        gap: 6,
    },
    emptyText: {
        fontSize: 13,
        color: "#888",
        fontStyle: "italic",
        margin: "0 0 12px 0",
    },
};

const emptyForm = { nom: "", cursus: "", promotions: "" };

export function RefadminView() {
    const [props, setProps] = useState(initialProps);
    const [cursusList, setCursusList] = useState(initialCursusList);
    const [activeTab, setActiveTab] = useState("filieres");

    // --- Modale Ajout / Édition de formation ---
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);

    // --- Modale Ajout d'un cursus (indépendant) ---
    const [isAddCursusModalOpen, setIsAddCursusModalOpen] = useState(false);
    const [addCursusForm, setAddCursusForm] = useState({ nom: "" });

    // --- Modale Édition d'un cursus ---
    const [cursusEditModal, setCursusEditModal] = useState(null); // { id }
    const [cursusEditForm, setCursusEditForm] = useState({ nom: "" });

    // --- Modale Ajout d'une promotion (depuis l'onglet Promotions) ---
    const [isAddPromoModalOpen, setIsAddPromoModalOpen] = useState(false);
    const [addPromoForm, setAddPromoForm] = useState({ formationId: "", nom: "" });

    // --- Modale Ajout d'un élève (depuis l'onglet Élèves) ---
    const [isAddEleveModalOpen, setIsAddEleveModalOpen] = useState(false);
    const [addEleveForm, setAddEleveForm] = useState({ formationId: "", promoIndex: "", nom: "" });

    // --- Modale Élèves d'une promotion (liste + ajout, via badge dans Promotions) ---
    const [eleveModal, setEleveModal] = useState(null); // { formationId, promoIndex }
    const [newEleve, setNewEleve] = useState("");

    // --- Modale Édition d'une promotion (nom + statut) ---
    const [promoEditModal, setPromoEditModal] = useState(null); // { formationId, promoIndex }
    const [promoEditForm, setPromoEditForm] = useState({ nom: "", enCours: false });

    // --- Modale Édition d'un élève (renommer) ---
    const [eleveEditModal, setEleveEditModal] = useState(null); // { formationId, promoIndex, eleveIndex }
    const [eleveEditName, setEleveEditName] = useState("");

    // --- Formation : ajout / édition ---
    const openAddModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setIsFormModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        setForm({
            nom: item.nom,
            cursus: item.cursus,
            promotions: item.promotions.map((p) => p.nom).join(", "),
        });
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nom.trim() || !form.cursus.trim()) return;

        const promoNames = form.promotions
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);

        if (editingId !== null) {
            setProps(
                props.map((item) => {
                    if (item.id !== editingId) return item;
                    const promotions = promoNames.map((nom) => {
                        const existing = item.promotions.find((p) => p.nom === nom);
                        return (
                            existing || {
                                nom,
                                enCours: nom.includes(CURRENT_YEAR),
                                eleves: [],
                            }
                        );
                    });
                    return { ...item, nom: form.nom.trim(), cursus: form.cursus.trim(), promotions };
                })
            );
        } else {
            const newEntry = {
                id: props.length ? Math.max(...props.map((p) => p.id)) + 1 : 1,
                nom: form.nom.trim(),
                cursus: form.cursus.trim(),
                promotions: promoNames.map((nom) => ({
                    nom,
                    enCours: nom.includes(CURRENT_YEAR),
                    eleves: [],
                })),
            };
            setProps([...props, newEntry]);
        }

        closeFormModal();
    };

    // --- Cursus (indépendant) : ajout ---
    const openAddCursusModal = () => {
        setAddCursusForm({ nom: "" });
        setIsAddCursusModalOpen(true);
    };

    const closeAddCursusModal = () => {
        setIsAddCursusModalOpen(false);
        setAddCursusForm({ nom: "" });
    };

    const handleAddCursusSubmit = (e) => {
        e.preventDefault();
        if (!addCursusForm.nom.trim()) return;

        const newCursus = {
            id: cursusList.length ? Math.max(...cursusList.map((c) => c.id)) + 1 : 1,
            nom: addCursusForm.nom.trim(),
        };
        setCursusList([...cursusList, newCursus]);
        closeAddCursusModal();
    };

    // --- Cursus (indépendant) : édition ---
    const openCursusEditModal = (cursusItem) => {
        setCursusEditModal({ id: cursusItem.id });
        setCursusEditForm({ nom: cursusItem.nom });
    };

    const closeCursusEditModal = () => {
        setCursusEditModal(null);
        setCursusEditForm({ nom: "" });
    };

    const handleCursusEditSubmit = (e) => {
        e.preventDefault();
        if (!cursusEditModal || !cursusEditForm.nom.trim()) return;

        setCursusList(
            cursusList.map((c) =>
                c.id === cursusEditModal.id ? { ...c, nom: cursusEditForm.nom.trim() } : c
            )
        );
        closeCursusEditModal();
    };

    // --- Ajout d'une promotion (à une formation existante) ---
    const openAddPromoModal = () => {
        setAddPromoForm({ formationId: props[0] ? String(props[0].id) : "", nom: "" });
        setIsAddPromoModalOpen(true);
    };

    const closeAddPromoModal = () => {
        setIsAddPromoModalOpen(false);
        setAddPromoForm({ formationId: "", nom: "" });
    };

    const handleAddPromoSubmit = (e) => {
        e.preventDefault();
        if (!addPromoForm.formationId || !addPromoForm.nom.trim()) return;

        setProps(
            props.map((item) =>
                item.id === Number(addPromoForm.formationId)
                    ? {
                        ...item,
                        promotions: [
                            ...item.promotions,
                            {
                                nom: addPromoForm.nom.trim(),
                                enCours: addPromoForm.nom.trim().includes(CURRENT_YEAR),
                                eleves: [],
                            },
                        ],
                    }
                    : item
            )
        );
        closeAddPromoModal();
    };

    // --- Ajout d'un élève (à une promotion existante) ---
    const openAddEleveModal = () => {
        const firstFormation = props[0];
        setAddEleveForm({
            formationId: firstFormation ? String(firstFormation.id) : "",
            promoIndex: firstFormation && firstFormation.promotions.length ? "0" : "",
            nom: "",
        });
        setIsAddEleveModalOpen(true);
    };

    const closeAddEleveModal = () => {
        setIsAddEleveModalOpen(false);
        setAddEleveForm({ formationId: "", promoIndex: "", nom: "" });
    };

    const addEleveFormationOptions = props;
    const addEleveSelectedFormation = props.find(
        (f) => f.id === Number(addEleveForm.formationId)
    );

    const handleAddEleveFormationChange = (e) => {
        const formationId = e.target.value;
        const formation = props.find((f) => f.id === Number(formationId));
        setAddEleveForm({
            formationId,
            promoIndex: formation && formation.promotions.length ? "0" : "",
            nom: addEleveForm.nom,
        });
    };

    const handleAddEleveSubmit = (e) => {
        e.preventDefault();
        if (
            !addEleveForm.formationId ||
            addEleveForm.promoIndex === "" ||
            !addEleveForm.nom.trim()
        )
            return;

        setProps(
            props.map((item) => {
                if (item.id !== Number(addEleveForm.formationId)) return item;
                const promotions = item.promotions.map((p, idx) =>
                    idx === Number(addEleveForm.promoIndex)
                        ? { ...p, eleves: [...p.eleves, addEleveForm.nom.trim()] }
                        : p
                );
                return { ...item, promotions };
            })
        );
        closeAddEleveModal();
    };

    // --- Gestion des élèves via badge de promo (onglet Promotions) ---
    const openEleveModal = (formationId, promoIndex) => {
        setEleveModal({ formationId, promoIndex });
        setNewEleve("");
    };

    const closeEleveModal = () => {
        setEleveModal(null);
        setNewEleve("");
    };

    const currentPromo =
        eleveModal &&
        props
            .find((f) => f.id === eleveModal.formationId)
            ?.promotions[eleveModal.promoIndex];

    const handleAddEleve = (e) => {
        e.preventDefault();
        if (!newEleve.trim() || !eleveModal) return;

        setProps(
            props.map((item) => {
                if (item.id !== eleveModal.formationId) return item;
                const promotions = item.promotions.map((p, idx) =>
                    idx === eleveModal.promoIndex
                        ? { ...p, eleves: [...p.eleves, newEleve.trim()] }
                        : p
                );
                return { ...item, promotions };
            })
        );
        setNewEleve("");
    };

    const handleRemoveEleve = (eleveIndex) => {
        if (!eleveModal) return;
        setProps(
            props.map((item) => {
                if (item.id !== eleveModal.formationId) return item;
                const promotions = item.promotions.map((p, idx) =>
                    idx === eleveModal.promoIndex
                        ? { ...p, eleves: p.eleves.filter((_, i) => i !== eleveIndex) }
                        : p
                );
                return { ...item, promotions };
            })
        );
    };

    const toggleEnCours = (formationId, promoIndex) => {
        setProps(
            props.map((item) => {
                if (item.id !== formationId) return item;
                const promotions = item.promotions.map((p, idx) =>
                    idx === promoIndex ? { ...p, enCours: !p.enCours } : p
                );
                return { ...item, promotions };
            })
        );
    };

    // --- Édition d'une promotion (nom + statut) ---
    const openPromoEditModal = (formationId, promoIndex) => {
        const promo = props.find((f) => f.id === formationId)?.promotions[promoIndex];
        if (!promo) return;
        setPromoEditModal({ formationId, promoIndex });
        setPromoEditForm({ nom: promo.nom, enCours: promo.enCours });
    };

    const closePromoEditModal = () => {
        setPromoEditModal(null);
        setPromoEditForm({ nom: "", enCours: false });
    };

    const handlePromoEditSubmit = (e) => {
        e.preventDefault();
        if (!promoEditModal || !promoEditForm.nom.trim()) return;

        setProps(
            props.map((item) => {
                if (item.id !== promoEditModal.formationId) return item;
                const promotions = item.promotions.map((p, idx) =>
                    idx === promoEditModal.promoIndex
                        ? { ...p, nom: promoEditForm.nom.trim(), enCours: promoEditForm.enCours }
                        : p
                );
                return { ...item, promotions };
            })
        );
        closePromoEditModal();
    };

    // --- Édition d'un élève (renommer) ---
    const openEleveEditModal = (formationId, promoIndex, eleveIndex) => {
        const promo = props.find((f) => f.id === formationId)?.promotions[promoIndex];
        if (!promo) return;
        setEleveEditModal({ formationId, promoIndex, eleveIndex });
        setEleveEditName(promo.eleves[eleveIndex]);
    };

    const closeEleveEditModal = () => {
        setEleveEditModal(null);
        setEleveEditName("");
    };

    const handleEleveEditSubmit = (e) => {
        e.preventDefault();
        if (!eleveEditModal || !eleveEditName.trim()) return;

        setProps(
            props.map((item) => {
                if (item.id !== eleveEditModal.formationId) return item;
                const promotions = item.promotions.map((p, idx) => {
                    if (idx !== eleveEditModal.promoIndex) return p;
                    const eleves = p.eleves.map((e, i) =>
                        i === eleveEditModal.eleveIndex ? eleveEditName.trim() : e
                    );
                    return { ...p, eleves };
                });
                return { ...item, promotions };
            })
        );
        closeEleveEditModal();
    };

    // --- Bouton "+" contextuel selon l'onglet actif ---
    const handleAddButtonClick = () => {
        switch (activeTab) {
            case "cursus":
                openAddCursusModal();
                break;
            case "promotions":
                openAddPromoModal();
                break;
            case "eleves":
                openAddEleveModal();
                break;
            case "filieres":
            default:
                openAddModal();
                break;
        }
    };

    // --- Données dérivées ---
    const allPromotions = props.flatMap((f) =>
        f.promotions.map((p, idx) => ({
            formationId: f.id,
            promoIndex: idx,
            filiere: f.nom,
            cursus: f.cursus,
            nom: p.nom,
            enCours: p.enCours,
            eleves: p.eleves,
        }))
    );

    const allEleves = props.flatMap((f) =>
        f.promotions.flatMap((p, promoIndex) =>
            p.eleves.map((eleve, eleveIndex) => ({
                formationId: f.id,
                promoIndex,
                eleveIndex,
                nom: eleve,
                promotion: p.nom,
                filiere: f.nom,
            }))
        )
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
                            <th style={styles.th}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.map((f) => (
                            <tr key={f.id}>
                                <td style={styles.td}>{f.id}</td>
                                <td style={styles.td}>{f.nom}</td>
                                <td style={styles.actionTd}>
                                    <button style={styles.editButton} onClick={() => openEditModal(f)} title="Modifier">
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
                        {allPromotions.map((p) => (
                            <tr key={`${p.formationId}-${p.nom}`}>
                                <td style={styles.td}>{p.nom}</td>
                                <td style={styles.td}>{p.filiere}</td>
                                <td style={styles.td}>{p.cursus}</td>
                                <td style={styles.td}>
                                    <button
                                        style={{
                                            ...styles.statusPill,
                                            ...(p.enCours ? styles.statusActive : styles.statusInactive),
                                        }}
                                        onClick={() => toggleEnCours(p.formationId, p.promoIndex)}
                                        title="Cliquer pour changer le statut"
                                    >
                                        {p.enCours ? "En cours" : "Terminée"}
                                    </button>
                                </td>
                                <td style={styles.td}>
                    <span
                        style={styles.badge}
                        onClick={() => openEleveModal(p.formationId, p.promoIndex)}
                        title="Voir / gérer les élèves"
                    >
                      Voir
                      <span style={styles.badgeCount}>{p.eleves.length}</span>
                    </span>
                                </td>
                                <td style={styles.actionTd}>
                                    <button
                                        style={styles.editButton}
                                        onClick={() => openPromoEditModal(p.formationId, p.promoIndex)}
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
                                <tr key={`${e.formationId}-${e.promoIndex}-${e.eleveIndex}`}>
                                    <td style={styles.td}>{e.nom}</td>
                                    <td style={styles.td}>{e.promotion}</td>
                                    <td style={styles.td}>{e.filiere}</td>
                                    <td style={styles.actionTd}>
                                        <button
                                            style={styles.editButton}
                                            onClick={() => openEleveEditModal(e.formationId, e.promoIndex, e.eleveIndex)}
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

            {/* Modale Ajout / Édition formation */}
            {isFormModalOpen && (
                <div style={styles.overlay} onClick={closeFormModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>
                            {editingId !== null ? "Modifier la formation" : "Ajouter une formation"}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.field}>
                                <label style={styles.label}>Nom</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="nom"
                                    value={form.nom}
                                    onChange={handleChange}
                                    placeholder="Ex: BUT INFO"
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Cursus</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="cursus"
                                    value={form.cursus}
                                    onChange={handleChange}
                                    placeholder="Ex: Data Science"
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Promotions (séparées par virgule)</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="promotions"
                                    value={form.promotions}
                                    onChange={handleChange}
                                    placeholder="Ex: PROMO2026, PROMO2025"
                                />
                            </div>
                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={closeFormModal}>
                                    Annuler
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    {editingId !== null ? "Enregistrer" : "Ajouter"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modale Ajout d'un cursus */}
            {isAddCursusModalOpen && (
                <div style={styles.overlay} onClick={closeAddCursusModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Ajouter un cursus</h3>
                        <form onSubmit={handleAddCursusSubmit}>
                            <div style={styles.field}>
                                <label style={styles.label}>Nom du cursus</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    value={addCursusForm.nom}
                                    onChange={(e) => setAddCursusForm({ nom: e.target.value })}
                                    placeholder="Ex: Data Science"
                                    autoFocus
                                />
                            </div>
                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={closeAddCursusModal}>
                                    Annuler
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modale Édition d'un cursus */}
            {cursusEditModal && (
                <div style={styles.overlay} onClick={closeCursusEditModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Modifier le cursus</h3>
                        <form onSubmit={handleCursusEditSubmit}>
                            <div style={styles.field}>
                                <label style={styles.label}>Nom du cursus</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    value={cursusEditForm.nom}
                                    onChange={(e) => setCursusEditForm({ nom: e.target.value })}
                                    autoFocus
                                />
                            </div>
                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={closeCursusEditModal}>
                                    Annuler
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modale Ajout d'une promotion */}
            {isAddPromoModalOpen && (
                <div style={styles.overlay} onClick={closeAddPromoModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Ajouter une promotion</h3>
                        {props.length === 0 ? (
                            <p style={styles.emptyText}>
                                Aucune formation existante. Crée d'abord une formation.
                            </p>
                        ) : (
                            <form onSubmit={handleAddPromoSubmit}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Formation</label>
                                    <select
                                        style={styles.select}
                                        value={addPromoForm.formationId}
                                        onChange={(e) =>
                                            setAddPromoForm({ ...addPromoForm, formationId: e.target.value })
                                        }
                                    >
                                        {props.map((f) => (
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
                                        value={addPromoForm.nom}
                                        onChange={(e) =>
                                            setAddPromoForm({ ...addPromoForm, nom: e.target.value })
                                        }
                                        placeholder="Ex: D2WM2027"
                                    />
                                </div>
                                <div style={styles.modalActions}>
                                    <button type="button" style={styles.cancelButton} onClick={closeAddPromoModal}>
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
            )}

            {/* Modale Ajout d'un élève */}
            {isAddEleveModalOpen && (
                <div style={styles.overlay} onClick={closeAddEleveModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Ajouter un élève</h3>
                        {addEleveFormationOptions.length === 0 ? (
                            <p style={styles.emptyText}>
                                Aucune formation existante. Crée d'abord une formation.
                            </p>
                        ) : !addEleveSelectedFormation || addEleveSelectedFormation.promotions.length === 0 ? (
                            <>
                                <div style={styles.field}>
                                    <label style={styles.label}>Formation</label>
                                    <select
                                        style={styles.select}
                                        value={addEleveForm.formationId}
                                        onChange={handleAddEleveFormationChange}
                                    >
                                        {addEleveFormationOptions.map((f) => (
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
                                    <button style={styles.cancelButton} onClick={closeAddEleveModal}>
                                        Fermer
                                    </button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleAddEleveSubmit}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Formation</label>
                                    <select
                                        style={styles.select}
                                        value={addEleveForm.formationId}
                                        onChange={handleAddEleveFormationChange}
                                    >
                                        {addEleveFormationOptions.map((f) => (
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
                                        value={addEleveForm.promoIndex}
                                        onChange={(e) =>
                                            setAddEleveForm({ ...addEleveForm, promoIndex: e.target.value })
                                        }
                                    >
                                        {addEleveSelectedFormation.promotions.map((p, idx) => (
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
                                        value={addEleveForm.nom}
                                        onChange={(e) => setAddEleveForm({ ...addEleveForm, nom: e.target.value })}
                                        placeholder="Ex: Prénom Nom"
                                    />
                                </div>
                                <div style={styles.modalActions}>
                                    <button type="button" style={styles.cancelButton} onClick={closeAddEleveModal}>
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
            )}

            {/* Modale Élèves d'une promotion (via badge, onglet Promotions) */}
            {eleveModal && currentPromo && (
                <div style={styles.overlay} onClick={closeEleveModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Élèves — {currentPromo.nom}</h3>

                        <label style={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={currentPromo.enCours}
                                onChange={() => toggleEnCours(eleveModal.formationId, eleveModal.promoIndex)}
                            />
                            Promotion en cours
                        </label>

                        {currentPromo.eleves.length === 0 ? (
                            <p style={styles.emptyText}>Aucun élève pour le moment.</p>
                        ) : (
                            <ul style={styles.eleveList}>
                                {currentPromo.eleves.map((eleve, idx) => (
                                    <li key={idx} style={styles.eleveItem}>
                                        {eleve}
                                        <button style={styles.removeEleveButton} onClick={() => handleRemoveEleve(idx)}>
                                            Retirer
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <form onSubmit={handleAddEleve} style={styles.addEleveRow}>
                            <input
                                style={{ ...styles.input, flex: 1 }}
                                type="text"
                                value={newEleve}
                                onChange={(e) => setNewEleve(e.target.value)}
                                placeholder="Nom de l'élève"
                            />
                            <button type="submit" style={styles.submitButton}>
                                Ajouter
                            </button>
                        </form>

                        <div style={styles.modalActions}>
                            <button style={styles.cancelButton} onClick={closeEleveModal}>
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modale Édition d'une promotion */}
            {promoEditModal && (
                <div style={styles.overlay} onClick={closePromoEditModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Modifier la promotion</h3>
                        <form onSubmit={handlePromoEditSubmit}>
                            <div style={styles.field}>
                                <label style={styles.label}>Nom</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    value={promoEditForm.nom}
                                    onChange={(e) => setPromoEditForm({ ...promoEditForm, nom: e.target.value })}
                                />
                            </div>
                            <label style={styles.checkboxRow}>
                                <input
                                    type="checkbox"
                                    checked={promoEditForm.enCours}
                                    onChange={(e) => setPromoEditForm({ ...promoEditForm, enCours: e.target.checked })}
                                />
                                Promotion en cours
                            </label>
                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={closePromoEditModal}>
                                    Annuler
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modale Édition d'un élève */}
            {eleveEditModal && (
                <div style={styles.overlay} onClick={closeEleveEditModal}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Modifier l'élève</h3>
                        <form onSubmit={handleEleveEditSubmit}>
                            <div style={styles.field}>
                                <label style={styles.label}>Nom</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    value={eleveEditName}
                                    onChange={(e) => setEleveEditName(e.target.value)}
                                />
                            </div>
                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={closeEleveEditModal}>
                                    Annuler
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}