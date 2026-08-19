import React, { useEffect, useState } from 'react';
import { getElevesByPromotion } from '../../../services/formateurService/formateurService.js';

export function PromotionElevesModal({ isOpen, course, onClose }) {
    const [eleves, setEleves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [courses, setCourses] = useState([]);
    const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);

    const loadEleves = async () => {
        if (isOpen && course?.promotion_id) {
            setLoading(true);
            setError(null);

            try {
                const res = await getElevesByPromotion(course.promotion_id);
                setEleves(res.data || []);
            } catch (err) {
                console.error("Erreur chargement élèves :", err);
                setError("Impossible de charger la liste des élèves.");
            } finally {
                setLoading(false);
            }
        }
    }
    useEffect(() => {
        loadEleves();
    }, [isOpen, course]);

    if (!isOpen || !course) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-[18px] font-semibold text-[#0F172A]">
                            Promotion : {course.promotion_nom}
                        </h2>
                        <p className="text-[12px] text-[#64748B] mt-0.5">
                            Module : {course.libelle} ({course.duree}h)
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-[#64748B] hover:bg-slate-100 cursor-pointer transition-colors"
                        aria-label="Fermer la modale"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-[14px] text-[#EF4444] border border-red-200">
                        {error}
                    </div>
                )}

                <div className="mt-4 max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="py-8 text-center text-[14px] text-[#64748B]">
                            <div className="inline-flex items-center gap-2">
                                <svg className="h-5 w-5 animate-spin text-[#2563EB]" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Chargement des élèves...
                            </div>
                        </div>
                    ) : eleves.length === 0 ? (
                        <div className="py-8 text-center text-[14px] text-[#64748B]">
                            Aucun élève affecté à cette promotion pour le moment.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="border-b border-slate-200 bg-[#F8FAFC]">
                                <th className="px-4 py-2.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
                                    Nom & Prénom
                                </th>
                                <th className="px-4 py-2.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
                                    Email
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {eleves.map((eleve) => (
                                <tr key={eleve.id} className="transition-colors hover:bg-slate-50">
                                    <td className="px-4 py-3 text-[14px] font-medium text-[#0F172A] whitespace-nowrap">
                                        {eleve.last_name} {eleve.first_name}
                                    </td>
                                    <td className="px-4 py-3 text-[14px] text-[#64748B] whitespace-nowrap">
                                        <a
                                            href={`mailto:${eleve.email}`}
                                            className="hover:text-[#2563EB] hover:underline"
                                        >
                                            {eleve.email}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[12px] text-[#64748B]">
                        Total : <strong className="text-[#0F172A]">{eleves.length}</strong> élève{eleves.length > 1 ? 's' : ''}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-[14px] font-medium text-[#0F172A] hover:bg-slate-200 cursor-pointer transition-colors"
                    >
                        Fermer
                    </button>
                </div>

            </div>
        </div>
    );
}