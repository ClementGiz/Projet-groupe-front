import React from 'react';

export function FiliereModal({ isOpen, isEditing, form, onChange, onSubmit, onClose, error }) {
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
                    {isEditing ? "Modifier la filière" : "Ajouter une filière"}
                </h3>

                <form onSubmit={onSubmit} className="mt-5 space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">Code</label>
                        <input
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                            type="text"
                            value={form.code}
                            onChange={(e) => onChange({ ...form, code: e.target.value })}
                            placeholder="Ex: DEV"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">Nom</label>
                        <input
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                            type="text"
                            value={form.nom}
                            onChange={(e) => onChange({ ...form, nom: e.target.value })}
                            placeholder="Ex: Développement"
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
            </div>
        </div>
    );
}