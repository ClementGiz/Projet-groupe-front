import React, { useEffect, useState } from 'react';
import { getUsers } from "../../../services/adminService.js";
import { AddUserModal } from "../../modals/Administrateur/AddUserModal.jsx";
import { EditUserModal } from "../../modals/Administrateur/EditUserModal.jsx";
import { DeleteUserModal } from "../../modals/Administrateur/DeleteUserModal.jsx";

export function AdminView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const loadAllUsers = async () => {
        setLoading(true);
        setLoadError(null);

        try {
            const res = await getUsers();
            setUsers(Array.isArray(res.data) ? res.data : (res.data?.users || []));
        } catch (error) {
            console.error("Erreur API :", error);
            setLoadError("Impossible de charger les données. Vérifiez que l'API est bien démarrée.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllUsers();
    }, []);

    const getRoleBadge = (rawRole) => {
        const role = (rawRole || '').toLowerCase().trim();

        if (role.includes('admin')) {
            return (
                <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-[12px] font-semibold text-[#EF4444] border border-red-200">
                    Admin
                </span>
            );
        }
        if (role.includes('ref')) {
            return (
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[12px] font-semibold text-[#F59E0B] border border-amber-200">
                    Référent
                </span>
            );
        }
        if (role.includes('formateur') || role.includes('teacher') || role.includes('trainer')) {
            return (
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-[#10B981] border border-emerald-200">
                    Formateur
                </span>
            );
        }
        return (
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-[#2563EB] border border-blue-200">
                {rawRole || 'Élève'}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-8 font-sans relative">

            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#10B981] px-4 py-3 text-[14px] font-medium text-white shadow-lg transition-all animate-bounce">
                    ✓ {toastMessage}
                </div>
            )}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[24px] font-bold text-[#0F172A]">
                        Gestion des utilisateurs
                    </h1>
                    <p className="mt-1 text-[14px] text-[#64748B]">
                        Gérez les comptes et les permissions d'accès au logiciel
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 cursor-pointer"
                >

                    + Ajouter un utilisateur
                </button>
            </div>

            {loadError && (
                <div className="mb-6 flex items-center justify-between rounded-lg border border-[#EF4444]/20 bg-red-50 p-4 text-[14px] text-[#EF4444]">
                    <span>{loadError}</span>
                    <button
                        onClick={loadAllUsers}
                        className="font-medium underline hover:text-red-800 cursor-pointer"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-slate-200 bg-[#F8FAFC]">
                            <th scope="col" className="px-6 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
                                Nom & Prénom
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
                                Rôle
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-[12px] font-semibold text-[#64748B] uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-[14px] text-[#64748B]">
                                    <div className="inline-flex items-center gap-2">
                                        Chargement des utilisateurs...
                                    </div>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-[14px] text-[#64748B]">
                                    Aucun utilisateur enregistré
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition-colors hover:bg-slate-50/80"
                                >
                                    <td className="px-6 py-4 text-[14px] font-medium text-[#0F172A] whitespace-nowrap">
                                        {user.last_name} {user.first_name}
                                    </td>

                                    <td className="px-6 py-4 text-[14px] text-[#64748B] whitespace-nowrap">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 text-[14px] whitespace-nowrap">
                                        {getRoleBadge(user.role)}
                                    </td>

                                    <td className="px-6 py-4 text-[14px] text-right whitespace-nowrap">
                                        <div className="inline-flex items-center justify-end gap-1">
                                            <button
                                                type="button"
                                                title="Modifier l'utilisateur"
                                                aria-label="Modifier"
                                                onClick={() => setEditingUser(user)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[15px] transition-colors hover:bg-slate-100 cursor-pointer"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                type="button"
                                                title="Supprimer l'utilisateur"
                                                aria-label="Supprimer"
                                                onClick={() => setDeletingUser(user)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[15px] transition-colors hover:bg-red-50 cursor-pointer"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    loadAllUsers();
                    showToast("Utilisateur créé avec succès");
                }}
            />

            <EditUserModal
                isOpen={Boolean(editingUser)}
                user={editingUser}
                onClose={() => setEditingUser(null)}
                onSuccess={() => {
                    loadAllUsers();
                    showToast("Utilisateur mis à jour");
                }}
            />

            <DeleteUserModal
                isOpen={Boolean(deletingUser)}
                user={deletingUser}
                onClose={() => setDeletingUser(null)}
                onSuccess={() => {
                    loadAllUsers();
                    showToast("Utilisateur supprimé");
                }}
            />
        </div>
    );
}