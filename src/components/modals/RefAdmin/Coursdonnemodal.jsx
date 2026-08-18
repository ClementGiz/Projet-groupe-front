import React, { useMemo } from 'react';

export function CoursDonneModal({
                                    isOpen,
                                    isEditing,
                                    promotions,
                                    formateurs,
                                    cursusList,
                                    form,
                                    onChange,
                                    onSubmit,
                                    onClose,
                                    onDelete,
                                    error,
                                }) {
    const availableCours = useMemo(() => {
        if (!form.promotion_id) return [];
        const promotion = promotions.find((p) => p.id === Number(form.promotion_id));
        if (!promotion) return [];

        const cursusDeLaFiliere = cursusList.filter((c) => c.filiere?.id === promotion.filiere?.id);

        return cursusDeLaFiliere.flatMap((c) =>
            (c.cursus_cours || []).map((cc) => ({
                id: cc.id,
                label: `${c.code} — ${cc.cours?.libelle}`,
            }))
        );
    }, [form.promotion_id, promotions, cursusList]);

    if (!isOpen) return null;

    const handlePromotionChange = (e) => {
        onChange({ ...form, promotion_id: e.target.value, cours_id: "" });
    };

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
                    {isEditing ? "Modifier la séance" : "Ajouter une séance au planning"}
                </h3>

                {promotions.length === 0 || formateurs.length === 0 ? (
                    <p className="mt-4 text-sm italic text-slate-500">
                        Il faut au moins une promotion et un formateur pour créer une séance.
                    </p>
                ) : (
                    <form onSubmit={onSubmit} className="mt-5 space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Promotion</label>
                            <select
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                value={form.promotion_id}
                                onChange={handlePromotionChange}
                            >
                                <option value="">— Sélectionner —</option>
                                {promotions.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Cours</label>
                            {!form.promotion_id ? (
                                <p className="text-sm italic text-slate-500">Choisis d'abord une promotion.</p>
                            ) : availableCours.length === 0 ? (
                                <p className="text-sm italic text-slate-500">
                                    Aucun cursus/cours défini pour la filière de cette promotion.
                                </p>
                            ) : (
                                <select
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                    value={form.cours_id}
                                    onChange={(e) => onChange({ ...form, cours_id: e.target.value })}
                                >
                                    <option value="">— Sélectionner —</option>
                                    {availableCours.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Formateur</label>
                            <select
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                value={form.formateur_id}
                                onChange={(e) => onChange({ ...form, formateur_id: e.target.value })}
                            >
                                <option value="">— Sélectionner —</option>
                                {formateurs.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.user?.first_name} {f.user?.last_name}
                                    </option>
                                ))}
                            </select>
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
                                    placeholder="Optionnel"
                                />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex items-center justify-end gap-2 pt-2">
                            {isEditing && onDelete && (
                                <button
                                    type="button"
                                    className="mr-auto text-sm font-medium text-red-500 transition-colors hover:text-red-600"
                                    onClick={onDelete}
                                >
                                    Supprimer
                                </button>
                            )}
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