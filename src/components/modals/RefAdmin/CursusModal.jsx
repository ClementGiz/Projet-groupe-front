import React from 'react';

export function CursusModal({ isOpen, isEditing, filieres, form, onChange, onSubmit, onClose, error }) {
    if (!isOpen) return null;

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
                    {isEditing ? "Modifier le cursus" : "Ajouter un cursus"}
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
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Code</label>
                            <input
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                type="text"
                                value={form.code}
                                onChange={(e) => onChange({ ...form, code: e.target.value })}
                                placeholder="Ex: CDA"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Libellé</label>
                            <input
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                type="text"
                                value={form.libelle}
                                onChange={(e) => onChange({ ...form, libelle: e.target.value })}
                                placeholder="Ex: Concepteur Développeur d'Applications"
                            />
                        </div>

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