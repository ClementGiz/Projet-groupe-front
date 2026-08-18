import React, {useEffect, useState} from 'react';
import {getMyCourses} from "../../../services/formateurService.js";
import {PromotionElevesModal} from "../../modals/Formateur/PromotionElevesModal.jsx";

export function FormateurCoursesView() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('ALL');
    const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);

    const loadCourses = async () => {
        setLoading(true);
        setLoadError(null);

        try {
            const res = await getMyCourses();
            setCourses(res.data || []);
        } catch (err) {
            console.error("Erreur lors de la récupération des cours :", err);
            setLoadError("Impossible de charger votre planning de cours. Vérifiez votre connexion.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const formatDateFR = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const filteredCourses = courses.filter((c) => {
        if (selectedFilter === 'EN_COURS') return c.statut === 'en_cours';
        if (selectedFilter === 'A_VENIR') return c.statut === 'a_venir';
        if (selectedFilter === 'TERMINE') return c.statut === 'termine';
        return true;
    });

    const getStatusBadge = (statut) => {
        switch (statut) {
            case 'en_cours':
                return (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[12px] font-medium text-[#F59E0B] border border-amber-200">
                        ● En cours
                    </span>
                );
            case 'a_venir':
                return (
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[12px] font-medium text-[#2563EB] border border-blue-200">
                        À venir
                    </span>
                );
            case 'termine':
                return (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[12px] font-medium text-[#64748B] border border-slate-200">
                        Terminé
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-8 font-sans">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[24px] font-bold text-[#0F172A]">
                        Mes Cours & Interventions
                    </h1>
                    <p className="mt-1 text-[14px] text-[#64748B]">
                        Consultez vos modules assignés et le planning des promotions
                    </p>
                </div>

                <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-xs">
                    <button
                        type="button"
                        onClick={() => setSelectedFilter('ALL')}
                        className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
                            selectedFilter === 'ALL'
                                ? 'bg-[#2563EB] text-white shadow-xs'
                                : 'text-[#64748B] hover:text-[#0F172A]'
                        }`}
                    >
                        Tous ({courses.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedFilter('EN_COURS')}
                        className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
                            selectedFilter === 'EN_COURS'
                                ? 'bg-[#2563EB] text-white shadow-xs'
                                : 'text-[#64748B] hover:text-[#0F172A]'
                        }`}
                    >
                        En cours
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedFilter('A_VENIR')}
                        className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
                            selectedFilter === 'A_VENIR'
                                ? 'bg-[#2563EB] text-white shadow-xs'
                                : 'text-[#64748B] hover:text-[#0F172A]'
                        }`}
                    >
                        À venir
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedFilter('TERMINE')}
                        className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
                            selectedFilter === 'TERMINE'
                                ? 'bg-[#2563EB] text-white shadow-xs'
                                : 'text-[#64748B] hover:text-[#0F172A]'
                        }`}
                    >
                        Terminés
                    </button>
                </div>
            </div>

            {loadError && (
                <div className="mb-6 flex items-center justify-between rounded-lg border border-[#EF4444]/20 bg-red-50 p-4 text-[14px] text-[#EF4444]">
                    <span>{loadError}</span>
                    <button
                        type="button"
                        onClick={loadCourses}
                        className="font-medium underline hover:text-red-800 cursor-pointer"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {loading ? (
                <div className="rounded-lg border border-slate-200 bg-white p-12 text-center text-[14px] text-[#64748B]">
                    <div className="inline-flex items-center gap-2">
                        <svg className="h-5 w-5 animate-spin text-[#2563EB]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Chargement de vos cours...
                    </div>
                </div>
            ) : filteredCourses.length === 0 ? (
                <div className="rounded-lg border border-slate-200 bg-white p-12 text-center text-[14px] text-[#64748B]">
                    Aucun cours trouvé pour cette sélection.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-[#0F172A]">
                                        🎓 {item.promotion_nom}
                                    </span>
                                    {getStatusBadge(item.statut)}
                                </div>
                                <h2 className="mt-4 text-[18px] font-semibold text-[#0F172A] leading-snug">
                                    {item.libelle}
                                </h2>
                                <div className="mt-3 flex items-center gap-4 text-[12px] text-[#64748B]">
                                    <span className="flex items-center gap-1">
                                        ⏱️ {item.duree} heures
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🏷️ Code : {item.code_cours}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                                <div className="text-[12px] text-[#64748B]">
                                    <span className="block font-medium text-[#0F172A]">Période :</span>
                                    <span>
                                        Du {formatDateFR(item.date_debut)} au {formatDateFR(item.date_fin)}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedCourseForModal(item)}
                                    className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer"
                                >
                                    Voir la promo →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <PromotionElevesModal
                isOpen={Boolean(selectedCourseForModal)}
                course={selectedCourseForModal}
                onClose={() => setSelectedCourseForModal(null)}
            />
        </div>
    );
}