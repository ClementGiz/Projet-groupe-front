import React from 'react';

export default function ProfilView() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Appel API vers le serveur backend
        try {
            const response = await fetch('/api/profil', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringgify({name: "Belka", email: "belka@ecole.fr"}),
            });

            if (response.ok) {
                alert("Profil mis à jours !");
            }

        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error)
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto w-full space-y-5">
            {/* En-tête */}
            <div className="border-b pb-4">
                <h2 className="font-bold text-lg text-slate-900">Mon Profil Utilisateur</h2>
            </div>

            {/* Formulaire du profil */}
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Nom Complet
                    </label>
                    <input
                        type="text"
                        defaultValue="Abdelkader Bakouche"
                        className="w-full p-2 border rounded-lg bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Adresse Email
                    </label>
                    <input
                        type="email"
                        defaultValue="a.bakouche@ecole.fr"
                        className="w-full p-2 border rounded-lg bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full p-2 border rounded-lg bg-white border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
                >
                    Sauvegarder les modifications
                </button>
            </form>
        </div>
    );
}