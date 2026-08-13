import React, { useState, useEffect } from 'react';

export default function ProfilView() {

    // Etats locaux - stocke l'ensemble des données du formulaire du profil

    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        promotion_name: '',
        password: ''
    });

    // Etat d'attente lors de la première requête GET

    const [loading, setLoading] = useState(true);

    // Gère nos modification flash locales { messsage: string, type: 'success' | 'error' }

    const [toast, setToast] = useState(null);

    // Petit helper maison pour afficher le toast et le masquer automatiquement au bout de 3s

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Requête GET initiale - On récupère les données du profil de l'utilisateur connecté au chargement du composant


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // TODO: À ajuster en équipe si on passe par un AuthContext ou un nom de clé différent dans le localStorage
                const token = localStorage.getItem('token');

                // Appel de notre route Django REST personnalisée (/me/)

                const response = await fetch('http://localhost:8000/api/profile/me/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    // Pré-remplissage des champs avec les données BDD

                    setFormData({
                        username: data.username || '',
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        email: data.email || '',
                        role: data.role || 'ELEVE',

                        // Si c'est un élève, on extrait la promotion liée via son profil

                        promotion_name: data.eleve_profile?.promotion?.nom || '',
                        password: '' // On laisse toujours le mot de passe vide à la lecture
                    });
                } else {
                    showToast('Impossible de charger le profil', 'error');
                }
            } catch (error) {
                showToast('Erreur de connexion au serveur', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Gestion des changements dans les champs de saisie

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Requête Path (soumission) - Mise à jour des informations utilsateur vers Django

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            // On prépare le payload avec les seuls champs modifiables

            const payload = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
            };

            // Si. le champ mot de passe n'est pas vide, on l'ajoute pour modification
            if (formData.password.trim() !== '') {
                payload.password = formData.password;
            }

            const response = await fetch('http://localhost:8000/api/profile/me/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showToast('Profil mis à jour avec succès !', 'success');
                setFormData((prev) => ({ ...prev, password: '' })); // Remet le champ MDP à vide après succès
            } else {
                const errorData = await response.json();
                showToast(errorData.detail || 'Erreur lors de la mise à jour', 'error');
            }
        } catch (error) {
            showToast('Erreur serveur lors de la sauvegarde', 'error');
        }
    };

    // Helper de rendu- Stylise et affiche le rôle (Admin, Formateur, Élève...)

    const renderRoleBadge = (role) => {
        const rolesMap = {
            ADMIN: { label: 'Administrateur', color: 'bg-purple-100 text-purple-700' },
            REF: { label: 'Référente Administrative', color: 'bg-blue-100 text-blue-700' },
            FORMATEUR: { label: 'Formateur', color: 'bg-amber-100 text-amber-700' },
            ELEVE: { label: 'Élève', color: 'bg-emerald-100 text-emerald-700' },
        };

        const currentRole = rolesMap[role] || { label: role, color: 'bg-slate-100 text-slate-700' };

        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${currentRole.color}`}>
        {currentRole.label}
      </span>
        );
    };

    // Écran de chargement

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12 text-slate-500 font-medium">
                Chargement des informations du profil...
            </div>
        );
    }

    return (
        <div className="relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto w-full space-y-5">

            {/* Toast Notification */}
            {toast && (
                <div
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                        toast.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
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
            <div className="border-b pb-4 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-lg text-slate-900">Mon Profil</h2>
                    <p className="text-xs text-slate-500">@{formData.username}</p>
                </div>
                <div>{renderRoleBadge(formData.role)}</div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">

                {formData.promotion_name && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-400 uppercase">Promotion</span>
                        <span className="text-slate-700 font-medium">{formData.promotion_name}</span>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                            Prénom
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg bg-white border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                            Nom
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg bg-white border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Adresse Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg bg-white border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Laissez vide pour conserver l'actuel"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg bg-white border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm active:scale-[0.98]"
                >
                    Sauvegarder les modifications
                </button>
            </form>
        </div>
    );
}