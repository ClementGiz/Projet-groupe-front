import React from 'react';

function isEnCours(dateDebut, dateFin) {
    if (!dateDebut || !dateFin) return false;
    const today = new Date();
    return today >= new Date(dateDebut) && today <= new Date(dateFin);
}

export function PromoModal({
                               isOpen,
                               isEditing,
                               filieres,
                               form,
                               onChange,
                               onSubmit,
                               onClose,
                               error,
                               eleves,
                               elevesLoading,
                               onGoToEleves,
                           }) {
    if (!isOpen) return null;

    const enCours = isEnCours(form.date_debut, form.date_fin);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold text-slate-900">
                    {isEditing ? "Modifier la promotion" : "Ajouter une promotion"}
                </h3>

                {filieres.length === 0 ? (
                    <p className="mt-4 text-sm italic text-slate-500">
                        Aucune filière existante. Crée d'abord une filière.
                    </p>
                ) : (
                    <form onSubmit={onSubmit} className="mt-5 space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Filière</label>
                            <select
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                value={form.filiere_id}
                                onChange={(e) => onChange({ ...form, filiere_id: e.target.value })}
                            >
                                <option value="">— Sélectionner —</option>
                                {filieres.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Nom de la promotion</label>
                            <input
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                type="text"
                                value={form.nom}
                                onChange={(e) => onChange({ ...form, nom: e.target.value })}
                                placeholder="Ex: DEV - Promo 2027"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="mb-1.5 block text-xs font-medium text-slate-500">Date de début</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                    type="date"
                                    value={form.date_debut}
                                    onChange={(e) => onChange({ ...form, date_debut: e.target.value })}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="mb-1.5 block text-xs font-medium text-slate-500">Date de fin</label>
                                <input
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                    type="date"
                                    value={form.date_fin}
                                    onChange={(e) => onChange({ ...form, date_fin: e.target.value })}
                                />
                            </div>
                        </div>

                        {form.date_debut && form.date_fin && (
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
                        )}

                        {isEditing && (
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-500">Élèves</label>

                                {elevesLoading ? (
                                    <p className="text-sm italic text-slate-500">Chargement...</p>
                                ) : !eleves || eleves.length === 0 ? (
                                    <p className="text-sm italic text-slate-500">Aucun élève dans cette promotion.</p>
                                ) : (
                                    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                                        {eleves.map((e) => (
                                            <li key={e.id} className="px-3 py-2 text-sm text-slate-900">
                                                {e.first_name} {e.last_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <button
                                    type="button"
                                    className="mt-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                                    onClick={onGoToEleves}
                                >
                                    Gérer les élèves dans l'onglet Élèves
                                </button>
                            </div>
                        )}

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                type="button"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                                onClick={onClose}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                {isEditing ? "Enregistrer" : "Ajouter"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}