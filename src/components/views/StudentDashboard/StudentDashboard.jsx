import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../elements/Calendar.jsx";
import { getCurrentUser } from "../../../services/authService";
import api from "../../../services/api"; // Instance Axios configurée avec le token

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [upcomingCourses, setUpcomingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setError(null);
                setLoading(true);

                // 1. Récupération de l'élève connecté via authService
                const userData = await getCurrentUser();
                setUser(userData);

                // 2. Appel API direct vers /planning/me/
                const response = await api.get('/planning/me/');
                const rawData = response.data;
                const rawList = Array.isArray(rawData) ? rawData : (rawData.cours_donnes || []);

                // 3. Formatage de la liste pour le composant <Calendar />
                const formattedEvents = rawList.map((item) => ({
                    id: item.id,
                    title: item.cours?.cours?.libelle || item.title || 'Cours',
                    promotion: item.promotion?.nom || '',
                    date: item.date_debut, // Format YYYY-MM-DD attendu par Calendar
                    date_fin: item.date_fin || null,
                    type: item.type || 'cours'
                }));

                setCalendarEvents(formattedEvents);

                // 4. Filtrage des 4 prochains cours à venir
                const today = new Date().toISOString().split('T')[0];
                const upcoming = rawList
                    .filter(c => c.date_debut >= today)
                    .sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut))
                    .slice(0, 4);

                setUpcomingCourses(upcoming);
            } catch (err) {
                console.error("Erreur chargement dashboard :", err);
                setError("Impossible de charger les données du tableau de bord.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen font-sans">

            {/* Banner d'erreur */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={() => window.location.reload()}
                        className="underline font-semibold hover:text-red-900 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {/* En-tête de bienvenue */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">
                        Bonjour, {user?.first_name || user?.username || 'Élève'} 👋
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Bienvenue sur votre espace de formation.
                    </p>
                </div>
                {user?.eleve_profile?.promotion && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 w-fit">
                        Promotion : {user.eleve_profile.promotion.nom}
                    </span>
                )}
            </div>

            {/* Grille principale */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Calendrier purement visuel */}
                <div className="lg:col-span-2">
                    <Calendar events={calendarEvents} />
                </div>

                {/* Sidebar Droite */}
                <div className="space-y-6">

                    {/* Carte Prochains Cours */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wider">
                            Prochains cours
                        </h2>

                        {loading ? (
                            <p className="text-xs text-slate-400 animate-pulse">Chargement des cours...</p>
                        ) : upcomingCourses.length === 0 ? (
                            <p className="text-xs text-slate-500">Aucun cours planifié prochainement.</p>
                        ) : (
                            <div className="space-y-3">
                                {upcomingCourses.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between space-y-1"
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="text-[11px] font-semibold text-blue-600">
                                                {item.date_debut}
                                            </span>
                                            <button
                                                onClick={() => navigate('/profil')}
                                                title="Contacter l'intervenant"
                                                className="text-slate-400 hover:text-blue-600 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="text-xs font-bold text-slate-800 truncate">
                                            {item.cours?.cours?.libelle || 'Cours'}
                                        </span>
                                        <span className="text-[11px] text-slate-500">
                                            Intervenant : {item.formateur?.user?.first_name
                                            ? `${item.formateur.user.first_name} ${item.formateur.user.last_name}`
                                            : 'Non assigné'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Support & Messagerie */}
                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 space-y-3">
                        <div className="space-y-1">
                            <h3 className="text-xs font-bold text-blue-900">Une question sur vos cours ?</h3>
                            <p className="text-xs text-blue-700 leading-relaxed">
                                Contactez vos formateurs ou votre référent directement via la messagerie.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/profil')}
                            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Ouvrir la messagerie
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}