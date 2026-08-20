import React, { useEffect, useState } from 'react';
import { FiliereModal } from '../../modals/RefAdmin/FiliereModal';
import { CursusModal } from '../../modals/RefAdmin/CursusModal';
import { PromoModal } from '../../modals/RefAdmin/PromoModal';
import { CoursDonneModal } from '../../modals/RefAdmin/CoursDonneModal';
import { PlanningView } from './PlanningView';
import {
    getFilieres, createFiliere, updateFiliere,
    getCursusList, createCursus, updateCursus,
    getPromotions, createPromotion, updatePromotion,
    getEleves, updateEleve,
    getFormateurs,
    getCoursDonnes, createCoursDonne, updateCoursDonne, deleteCoursDonne,
} from '../../../services/refAdminService/refadminService.js';

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
    eleves: null,
};

const emptyFiliereForm = { code: "", nom: "" };
const emptyCursusForm = { filiere_id: "", code: "", libelle: "" };
const emptyPromoForm = { filiere_id: "", nom: "", date_debut: "", date_fin: "" };
const emptyCoursDonneForm = { promotion_id: "", cours_id: "", formateur_id: "", date_debut: "", date_fin: "" };

const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20";
const thClass = "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500";
const tdClass = "px-3 py-3 text-sm text-slate-900";
const editButtonClass =
    "rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700";

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
    const [formateurs, setFormateurs] = useState([]);
    const [coursDonnes, setCoursDonnes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const [activeTab, setActiveTab] = useState("filieres");

    // --- Toast de confirmation d'action ---
    const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'error' }

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        window.clearTimeout(showToast._t);
        showToast._t = window.setTimeout(() => setToast(null), 2500);
    };

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

    // --- Planning (CoursDonne) ---
    const [isCoursDonneModalOpen, setIsCoursDonneModalOpen] = useState(false);
    const [editingCoursDonneId, setEditingCoursDonneId] = useState(null);
    const [coursDonneForm, setCoursDonneForm] = useState(emptyCoursDonneForm);
    const [coursDonneError, setCoursDonneError] = useState(null);

    // --- Chargement initial ---
    const loadAll = async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const [filieresRes, cursusRes, promotionsRes, elevesRes, formateursRes, coursDonnesRes] = await Promise.all([
                getFilieres(),
                getCursusList(),
                getPromotions(),
                getEleves(),
                getFormateurs(),
                getCoursDonnes(),
            ]);
            setFilieres(filieresRes.data);
            setCursusList(cursusRes.data);
            setPromotions(promotionsRes.data);
            setEleves(elevesRes.data);
            setFormateurs(formateursRes.data);
            setCoursDonnes(coursDonnesRes.data);
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
                showToast("Filière modifiée.");
            } else {
                await createFiliere(filiereForm);
                showToast("Filière ajoutée.");
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
                showToast("Cursus modifié.");
            } else {
                await createCursus(cursusForm);
                showToast("Cursus ajouté.");
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
                showToast("Promotion modifiée.");
            } else {
                await createPromotion(promoForm);
                showToast("Promotion ajoutée.");
            }
            await loadAll();
            closePromoModal();
        } catch (err) {
            setPromoError("Erreur lors de l'enregistrement de la promotion.");
        }
    };

    // --- Planning : handlers ---
    const openAddCoursDonneModal = () => {
        setEditingCoursDonneId(null);
        setCoursDonneForm(emptyCoursDonneForm);
        setCoursDonneError(null);
        setIsCoursDonneModalOpen(true);
    };

    const openEditCoursDonneModal = (cd) => {
        setEditingCoursDonneId(cd.id);
        setCoursDonneForm({
            promotion_id: String(cd.promotion?.id ?? ""),
            cours_id: String(cd.cours?.id ?? ""),
            formateur_id: String(cd.formateur?.id ?? ""),
            date_debut: cd.date_debut,
            date_fin: cd.date_fin ?? "",
        });
        setCoursDonneError(null);
        setIsCoursDonneModalOpen(true);
    };

    const closeCoursDonneModal = () => {
        setIsCoursDonneModalOpen(false);
        setEditingCoursDonneId(null);
        setCoursDonneForm(emptyCoursDonneForm);
        setCoursDonneError(null);
    };

    const handleCoursDonneSubmit = async (e) => {
        e.preventDefault();
        if (!coursDonneForm.promotion_id || !coursDonneForm.cours_id || !coursDonneForm.formateur_id || !coursDonneForm.date_debut) {
            return;
        }

        const payload = {
            ...coursDonneForm,
            date_fin: coursDonneForm.date_fin || null,
        };

        setCoursDonneError(null);
        try {
            if (editingCoursDonneId !== null) {
                await updateCoursDonne(editingCoursDonneId, payload);
                showToast("Séance modifiée.");
            } else {
                await createCoursDonne(payload);
                showToast("Séance ajoutée au planning.");
            }
            await loadAll();
            closeCoursDonneModal();
        } catch (err) {
            setCoursDonneError("Erreur lors de l'enregistrement de la séance.");
        }
    };

    const handleCoursDonneDelete = async () => {
        if (editingCoursDonneId === null) return;
        setCoursDonneError(null);
        try {
            await deleteCoursDonne(editingCoursDonneId);
            await loadAll();
            closeCoursDonneModal();
            showToast("Séance supprimée.");
        } catch (err) {
            setCoursDonneError("Erreur lors de la suppression de la séance.");
        }
    };

    // --- Élèves : réassignation de promotion ---
    const handleReassignEleve = async (eleveId, promotionId) => {
        if (!promotionId) return;
        try {
            await updateEleve(eleveId, { promotion_id: promotionId });
            await loadAll();
            showToast("Élève réassigné.");
        } catch (err) {
            showToast("Erreur lors de la réassignation.", "error");
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
                    <table className="w-full table-fixed border-collapse">
                        <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-200">
                            <th className={thClass + " w-28"}>Code</th>
                            <th className={thClass}>Nom</th>
                            <th className={thClass + " w-36 text-right"}>Nb promotions</th>
                            <th className={thClass + " w-14"}></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filieres.length === 0 ? (
                            <tr><td className={tdClass + " italic text-slate-500"} colSpan={4}>Aucune filière enregistrée.</td></tr>
                        ) : (
                            filieres.map((f) => (
                                <tr key={f.id} className="transition-colors hover:bg-slate-50">
                                    <td className={tdClass + " truncate"}>{f.code}</td>
                                    <td className={tdClass + " truncate"}>{f.nom}</td>
                                    <td className={tdClass + " text-right"}>
                                        {promotions.filter((p) => p.filiere?.id === f.id).length}
                                    </td>
                                    <td className={tdClass + " text-right"}>
                                        <button className={editButtonClass} onClick={() => openEditFiliereModal(f)} title="Modifier">
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
                    <table className="w-full table-fixed border-collapse">
                        <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-200">
                            <th className={thClass + " w-28"}>Code</th>
                            <th className={thClass + " w-1/3"}>Libellé</th>
                            <th className={thClass}>Filière</th>
                            <th className={thClass + " w-14"}></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {cursusList.length === 0 ? (
                            <tr><td className={tdClass + " italic text-slate-500"} colSpan={4}>Aucun cursus enregistré.</td></tr>
                        ) : (
                            cursusList.map((c) => (
                                <tr key={c.id} className="transition-colors hover:bg-slate-50">
                                    <td className={tdClass + " truncate"}>{c.code}</td>
                                    <td className={tdClass + " truncate"}>{c.libelle}</td>
                                    <td className={tdClass + " truncate"}>{c.filiere?.nom}</td>
                                    <td className={tdClass + " text-right"}>
                                        <button className={editButtonClass} onClick={() => openCursusEditModal(c)} title="Modifier">
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
                    <table className="w-full table-fixed border-collapse">
                        <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-200">
                            <th className={thClass + " w-1/4"}>Promotion</th>
                            <th className={thClass + " w-32"}>Filière</th>
                            <th className={thClass + " w-48"}>Dates</th>
                            <th className={thClass + " w-28"}>Statut</th>
                            <th className={thClass + " w-24"}>Élèves</th>
                            <th className={thClass + " w-14"}></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {promotions.length === 0 ? (
                            <tr><td className={tdClass + " italic text-slate-500"} colSpan={6}>Aucune promotion enregistrée.</td></tr>
                        ) : (
                            promotions.map((p) => {
                                const enCours = isEnCours(p.date_debut, p.date_fin);
                                const nbEleves = eleves.filter((e) => e.eleve_profile?.promotion?.id === p.id).length;
                                return (
                                    <tr key={p.id} className="transition-colors hover:bg-slate-50">
                                        <td className={tdClass + " truncate"}>{p.nom}</td>
                                        <td className={tdClass + " truncate"}>{p.filiere?.nom}</td>
                                        <td className={tdClass + " truncate text-slate-500"}>{p.date_debut} → {p.date_fin}</td>
                                        <td className={tdClass}>
                                            <span
                                                className={
                                                    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium " +
                                                    (enCours
                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        : "border-slate-200 bg-slate-100 text-slate-500")
                                                }
                                            >
                                                {enCours ? "En cours" : "Terminée"}
                                            </span>
                                        </td>
                                        <td className={tdClass}>
                                            <span
                                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200"
                                                onClick={() => openPromoEditModal(p)}
                                                title="Voir / gérer les élèves"
                                            >
                                                Voir
                                                <span className="rounded-full bg-blue-600 px-1.5 text-[10px] font-semibold text-white">
                                                    {nbEleves}
                                                </span>
                                            </span>
                                        </td>
                                        <td className={tdClass + " text-right"}>
                                            <button className={editButtonClass} onClick={() => openPromoEditModal(p)} title="Modifier">
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
                    <table className="w-full table-fixed border-collapse">
                        <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-200">
                            <th className={thClass + " w-1/4"}>Nom</th>
                            <th className={thClass + " w-1/3"}>Email</th>
                            <th className={thClass + " w-1/5"}>Promotion actuelle</th>
                            <th className={thClass}>Réassigner</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {eleves.length === 0 ? (
                            <tr><td className={tdClass + " italic text-slate-500"} colSpan={4}>Aucun élève enregistré.</td></tr>
                        ) : (
                            eleves.map((e) => (
                                <tr key={e.id} className="transition-colors hover:bg-slate-50">
                                    <td className={tdClass + " truncate"}>{e.first_name} {e.last_name}</td>
                                    <td className={tdClass + " truncate text-slate-500"}>{e.email}</td>
                                    <td className={tdClass + " truncate"}>{e.eleve_profile?.promotion?.nom ?? "—"}</td>
                                    <td className={tdClass}>
                                        <select
                                            className={inputClass + " max-w-xs"}
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
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                Chargement...
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-red-500">{loadError}</p>
                <button
                    className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    onClick={loadAll}
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex gap-1">
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                className={
                                    "border-b-2 px-4 py-2 text-sm font-medium transition-colors " +
                                    (activeTab === tab.key
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-slate-500 hover:text-slate-900")
                                }
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {ADD_ACTION_LABELS[activeTab] && (
                        <button
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-medium text-white transition-colors hover:bg-blue-700"
                            onClick={handleAddButtonClick}
                            title={ADD_ACTION_LABELS[activeTab]}
                        >
                            +
                        </button>
                    )}
                </div>

                <div className="h-[420px] overflow-y-auto">
                    {renderTable()}
                </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-200 pb-3">
                    <span className="text-lg font-semibold text-slate-900">Planning</span>
                </div>
                <PlanningView
                    coursDonnes={coursDonnes}
                    onSelectCoursDonne={openEditCoursDonneModal}
                    onAdd={openAddCoursDonneModal}
                />
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

            <CoursDonneModal
                isOpen={isCoursDonneModalOpen}
                isEditing={editingCoursDonneId !== null}
                promotions={promotions}
                formateurs={formateurs}
                cursusList={cursusList}
                form={coursDonneForm}
                onChange={setCoursDonneForm}
                onSubmit={handleCoursDonneSubmit}
                onClose={closeCoursDonneModal}
                onDelete={handleCoursDonneDelete}
                error={coursDonneError}
            />

            {toast && (
                <div
                    className={
                        "fixed bottom-4 right-4 z-50 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg " +
                        (toast.type === "error" ? "bg-red-500" : "bg-emerald-500")
                    }
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
}