import React, { useState } from 'react';
import { createUser } from '../../../services/adminService.js';

const INITIAL_FORM = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    role: 'ELEVE',
    password: ''
};

export function AddUserModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createUser(formData);
            setFormData(INITIAL_FORM);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Erreur lors de la création de l\'utilisateur.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h2 className="text-[18px] font-semibold text-[#0F172A]">Ajouter un utilisateur</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-[#64748B] hover:bg-slate-100 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-[14px] text-[#EF4444] border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[12px] font-medium text-[#0F172A] mb-1">Prénom</label>
                            <input
                                type="text"
                                name="first_name"
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] font-medium text-[#0F172A] mb-1">Nom</label>
                            <input
                                type="text"
                                name="last_name"
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[12px] font-medium text-[#0F172A] mb-1">Nom d'utilisateur</label>
                            <input
                                type="text"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] font-medium text-[#0F172A] mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[12px] font-medium text-[#0F172A] mb-1">Rôle</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                            >
                                <option value="ELEVE">Élève</option>
                                <option value="FORMATEUR">Formateur</option>
                                <option value="REF">Référent administratif</option>
                                <option value="ADMIN">Administrateur</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[12px] font-medium text-[#0F172A] mb-1">Mot de passe temporaire</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-[14px] font-medium text-[#64748B] hover:bg-slate-100 cursor-pointer"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2 text-[14px] font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? 'Création...' : 'Créer l\'utilisateur'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}