import React, { useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile } from '../../../services/profilService.js';

export default function ProfilView() {
    // --- ÉTATS LOCAUX ---
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        promotion_name: '',
        password: ''
    });

    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    // Helper de notification (Charte : retour d'action discret)[cite: 1]
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // --- REQUÊTE GET INITIALE ---
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Utilisation du service Axios (le token est injecté automatiquement par l'intercepteur)
                const data = await getMyProfile();

                setFormData({
                    username: data.username || '',
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    email: data.email || '',
                    role: data.role || 'ELEVE',
                    promotion_name: data.eleve_profile?.promotion?.nom || '',
                    password: ''
                });
            } catch (error) {
                showToast('Impossible de charger le profil', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- REQUÊTE PATCH (SOUMISSION) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
            };

            if (formData.password.trim() !== '') {
                payload.password = formData.password;
            }

            // Appel de la méthode PATCH via Axios
            await updateMyProfile(payload);

            showToast('Profil mis à jour avec succès !', 'success');
            setFormData((prev) => ({ ...prev, password: '' }));
        } catch (error) {
            showToast('Erreur lors de la mise à jour du profil', 'error');
        }
    };

    // Rendu du badge de rôle
    const renderRoleBadge = (role) => {
        const rolesMap = {
            ADMIN: { label: 'Administrateur', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            REF: { label: 'Référente Administrative', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            FORMATEUR: { label: 'Formateur', color: 'bg-amber-50 text-amber-800 border-amber-200' },
            ELEVE: { label: 'Élève', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
        };

        const currentRole = rolesMap[role] || { label: role, color: 'bg-slate-100 text-slate-700 border-slate-200' };

        return (
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${currentRole.color}`}>
        {currentRole.label}
      </span>
        );
    };

    // Écran de chargement
    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 text-slate-500 text-sm font-normal">
                Chargement des informations du profil...
            </div>
        );
    }

    return (
        <div className="relative bg-white p-6 rounded-lg border border-slate-200 shadow-sm max-w-xl mx-auto w-full space-y-5">

            {/* Toast Notification */}
            {toast && (
                <div
                    className={`p-3 rounded-lg text-sm font-normal transition-all duration-300 flex items-center justify-between border ${
                        toast.type === 'success'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-red-50 text-red-900 border-red-200'
                    }`}
                >
                    <span>{toast.message}</span>
                    <button
                        onClick={() => setToast(null)}
                        className="text-xs font-bold ml-4 opacity-60 hover:opacity-100"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* En-tête */}
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-lg text-slate-900">Mon Profil</h2>
                    <p className="text-xs text-slate-500 mt-0.5">@{formData.username}</p>
                </div>
                <div>{renderRoleBadge(formData.role)}</div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4">

                {formData.promotion_name && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="block text-xs text-slate-500 uppercase font-medium mb-0.5">Promotion</span>
                        <span className="text-sm text-slate-900 font-normal">{formData.promotion_name}</span>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                            Prénom
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full p-2.5 text-sm font-normal text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                            Nom
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full p-2.5 text-sm font-normal text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                        Adresse Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2.5 text-sm font-normal text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                        Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Laissez vide pour conserver l'actuel"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2.5 text-sm font-normal text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition placeholder:text-slate-400"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm active:scale-[0.99] cursor-pointer"
                    >
                        Sauvegarder les modifications
                    </button>
                </div>
            </form>
        </div>
    );
}