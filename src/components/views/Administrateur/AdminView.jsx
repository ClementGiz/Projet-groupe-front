import React, { useEffect, useState } from 'react';
import { getUsers } from "../../../services/adminService.js";

export function AdminView() {
    const [usersData, setUsersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const loadAllUsers = async () => {
        setLoading(true);
        setLoadError(null);

        try {
            const res = await getUsers();
            setUsersData(res.data);
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

    const userList = Array.isArray(usersData)
        ? usersData
        : (usersData?.users || []);

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
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-8 font-sans">
            {/* Header de la vue */}
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
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 cursor-pointer"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter un utilisateur
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
                                        <svg className="h-5 w-5 animate-spin text-[#2563EB]" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Chargement des utilisateurs...
                                    </div>
                                </td>
                            </tr>
                        ) : userList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-[14px] text-[#64748B]">
                                    Aucun utilisateur enregistré
                                </td>
                            </tr>
                        ) : (
                            userList.map((user, index) => (
                                <tr
                                    key={user.id || index}
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
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[15px] transition-colors hover:bg-slate-100 cursor-pointer"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                type="button"
                                                title="Supprimer l'utilisateur"
                                                aria-label="Supprimer"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[15px] transition-colors hover:bg-red-50 hover:text-[#EF4444] cursor-pointer"
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
        </div>
    );
}