import React, { useState } from 'react';

const initialProps = [
    { id: 1, nom: "D2WM", cursus: "Web Development", promotions: ["D2WM2026", "D2WM2025"] },
    { id: 2, nom: "EADL", cursus: "Full-Stack Development", promotions: ["CDA2026", "CDA2025"] },
    { id: 3, nom: "CDA", cursus: "DevOps", promotions: ["EADL2026", "EADL2025"] },
    { id: 4, nom: "TSSR", cursus: "Infrastructure", promotions: ["TSSR2026", "TSSR2025"] },
];

const styles = {
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
    },
    actionTd: {
        padding: "10px 14px",
        textAlign: "center",
        borderBottom: "1px solid #e0e0e0",
        width: 40,
    },
    editButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 15,
        padding: 4,
        borderRadius: 4,
    },
    addButton: {
        marginBottom: 12,
        padding: "8px 16px",
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        fontSize: 14,
        cursor: "pointer",
    },
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
};

const emptyForm = { nom: "", cursus: "", promotions: "" };

export function RefadminView() {
    const [props, setProps] = useState(initialProps);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // null = mode ajout, sinon = id en édition
    const [form, setForm] = useState(emptyForm);

    const openAddModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        setForm({
            nom: item.nom,
            cursus: item.cursus,
            promotions: item.promotions.join(", "),
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nom.trim() || !form.cursus.trim()) return;

        const promotions = form.promotions
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);

        if (editingId !== null) {
            // Mode édition : on remplace la ligne existante
            setProps(
                props.map((item) =>
                    item.id === editingId
                        ? { ...item, nom: form.nom.trim(), cursus: form.cursus.trim(), promotions }
                        : item
                )
            );
        } else {
            // Mode ajout
            const newEntry = {
                id: props.length ? Math.max(...props.map((p) => p.id)) + 1 : 1,
                nom: form.nom.trim(),
                cursus: form.cursus.trim(),
                promotions,
            };
            setProps([...props, newEntry]);
        }

        closeModal();
    };

    return (
        <div>
            <button style={styles.addButton} onClick={openAddModal}>
                + Ajouter une formation
            </button>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Nom</th>
                    <th style={styles.th}>Cursus</th>
                    <th style={styles.th}>Promotions</th>
                    <th style={styles.th}></th>
                </tr>
                </thead>
                <tbody>
                {props.map((item) => (
                    <tr key={item.id}>
                        <td style={styles.td}>{item.id}</td>
                        <td style={styles.td}>{item.nom}</td>
                        <td style={styles.td}>{item.cursus}</td>
                        <td style={styles.td}>{item.promotions.join(", ")}</td>
                        <td style={styles.actionTd}>
                            <button
                                style={styles.editButton}
                                onClick={() => openEditModal(item)}
                                title="Modifier"
                            >
                                ✏️
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div style={styles.overlay} onClick={closeModal}>
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
                                <button type="button" style={styles.cancelButton} onClick={closeModal}>
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
        </div>
    );
}