import React, { useState } from 'react';
import { deleteUser } from '../../../services/adminService.js';

export function DeleteUserModal({ isOpen, user, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !user) return null;

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            await deleteUser(user.id);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Erreur lors de la suppression.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-[#EF4444]">
                        🗑️
                    </div>
                    <div>
                        <h2 className="text-[18px] font-semibold text-[#0F172A]">Supprimer l'utilisateur</h2>
                        <p className="text-[14px] text-[#64748B] mt-1">
                            Êtes-vous sûr de vouloir supprimer <strong className="text-[#0F172A]">{user.first_name} {user.last_name}</strong> ? Cette action est irréversible.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-[14px] text-[#EF4444] border border-red-200">
                        {error}
                    </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-[14px] font-medium text-[#64748B] hover:bg-slate-100 cursor-pointer"
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleDelete}
                        className="inline-flex items-center justify-center rounded-lg bg-[#EF4444] px-4 py-2 text-[14px] font-medium text-white shadow-sm hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Suppression...' : 'Supprimer définitivement'}
                    </button>
                </div>
            </div>
        </div>
    );
}