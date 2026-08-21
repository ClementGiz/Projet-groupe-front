import React, { useEffect, useState, useMemo } from 'react';
import { getUsers } from "../../../services/adminService/adminService.js";
import { AddUserModal } from "../../modals/Administrateur/AddUserModal.jsx";
import { EditUserModal } from "../../modals/Administrateur/EditUserModal.jsx";
import { DeleteUserModal } from "../../modals/Administrateur/DeleteUserModal.jsx";

export function AdminView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('ALL');
    const [sortBy, setSortBy] = useState('name_asc');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[12px] font-semibold text-[#EF4444] border border-red-200">
                    Admin
                </span>
            );
        }
        if (role.includes('ref')) {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[12px] font-semibold text-[#F59E0B] border border-amber-200">
                    Référent
                </span>
            );
        }
        if (role.includes('formateur')) {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-[#10B981] border border-emerald-200">
                    Formateur
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-[#2563EB] border border-blue-200">
                Élève
            </span>
        );
    };

    const filteredAndSortedUsers = useMemo(() => {
        return users
            .filter((user) => {
                const query = searchTerm.toLowerCase().trim();
                const matchesSearch =
                    !query ||
                    (user.first_name || '').toLowerCase().includes(query) ||
                    (user.last_name || '').toLowerCase().includes(query) ||
                    (user.email || '').toLowerCase().includes(query) ||
                    (user.username || '').toLowerCase().includes(query);

                const userRole = (user.role || '').toUpperCase();
                let matchesRole = true;
                if (selectedRole !== 'ALL') {
                    if (selectedRole === 'ADMIN') matchesRole = userRole.includes('ADMIN');
                    else if (selectedRole === 'REF') matchesRole = userRole.includes('REF');
                    else if (selectedRole === 'FORMATEUR') matchesRole = userRole.includes('FORMATEUR');
                    else if (selectedRole === 'ELEVE') matchesRole = userRole.includes('ELEVE');
                }

                return matchesSearch && matchesRole;
            })
            .sort((a, b) => {
                if (sortBy === 'name_asc') {
                    return (a.last_name || '').localeCompare(b.last_name || '');
                }
                if (sortBy === 'name_desc') {
                    return (b.last_name || '').localeCompare(a.last_name || '');
                }
                if (sortBy === 'email_asc') {
                    return (a.email || '').localeCompare(b.email || '');
                }
                if (sortBy === 'role') {
                    return (a.role || '').localeCompare(b.role || '');
                }
                return 0;
            });
    }, [users, searchTerm, selectedRole, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedRole, sortBy, itemsPerPage]);


    const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage) || 1;
    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedUsers.slice(start, start + itemsPerPage);
    }, [filteredAndSortedUsers, currentPage, itemsPerPage]);

    // Les compteurs s'ajustent désormais en direct avec la saisie dans le champ de recherche
    const roleCounts = useMemo(() => {
        const query = searchTerm.toLowerCase().trim();
        const counts = { ALL: 0, ADMIN: 0, REF: 0, FORMATEUR: 0, ELEVE: 0 };

        users.forEach((u) => {
            const matchesSearch =
                !query ||
                (u.first_name || '').toLowerCase().includes(query) ||
                (u.last_name || '').toLowerCase().includes(query) ||
                (u.email || '').toLowerCase().includes(query) ||
                (u.username || '').toLowerCase().includes(query);

            if (matchesSearch) {
                counts.ALL++;
                const r = (u.role || '').toUpperCase();
                if (r.includes('ADMIN')) counts.ADMIN++;
                else if (r.includes('REF')) counts.REF++;
                else if (r.includes('FORMATEUR')) counts.FORMATEUR++;
                else counts.ELEVE++;
            }
        });

        return counts;
    }, [users, searchTerm]);

    const hasActiveFilters = searchTerm !== '' || selectedRole !== 'ALL';

    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedRole('ALL');
        setSortBy('name_asc');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-8 font-sans relative">

            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#10B981] px-4 py-3 text-[14px] font-medium text-white shadow-lg transition-all animate-bounce">
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[26px] font-extrabold tracking-tight text-[#0F172A]">
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
                    <span>+ Ajouter un utilisateur</span>
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

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
                <button
                    onClick={() => setSelectedRole('ALL')}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all cursor-pointer ${
                        selectedRole === 'ALL'
                            ? 'border-[#2563EB] bg-blue-50/50 shadow-xs ring-1 ring-[#2563EB]'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                >
                    <span className="text-[14px] font-medium text-[#64748B]">Tous les comptes</span>
                    <span className="mt-1 text-[18px] font-extrabold text-[#0F172A]">{roleCounts.ALL}</span>
                </button>

                <button
                    onClick={() => setSelectedRole('ADMIN')}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all cursor-pointer ${
                        selectedRole === 'ADMIN'
                            ? 'border-[#EF4444] bg-red-50/50 shadow-xs ring-1 ring-[#EF4444]'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                >
                    <span className="text-[14px] font-medium text-[#EF4444]">Administrateurs</span>
                    <span className="mt-1 text-[18px] font-extrabold text-[#0F172A]">{roleCounts.ADMIN}</span>
                </button>

                <button
                    onClick={() => setSelectedRole('REF')}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all cursor-pointer ${
                        selectedRole === 'REF'
                            ? 'border-[#F59E0B] bg-amber-50/50 shadow-xs ring-1 ring-[#F59E0B]'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                >
                    <span className="text-[14px] font-medium text-[#F59E0B]">Référents</span>
                    <span className="mt-1 text-[18px] font-extrabold text-[#0F172A]">{roleCounts.REF}</span>
                </button>

                <button
                    onClick={() => setSelectedRole('FORMATEUR')}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all cursor-pointer ${
                        selectedRole === 'FORMATEUR'
                            ? 'border-[#10B981] bg-emerald-50/50 shadow-xs ring-1 ring-[#10B981]'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                >
                    <span className="text-[14px] font-medium text-[#10B981]">Formateurs</span>
                    <span className="mt-1 text-[18px] font-extrabold text-[#0F172A]">{roleCounts.FORMATEUR}</span>
                </button>

                <button
                    onClick={() => setSelectedRole('ELEVE')}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all cursor-pointer ${
                        selectedRole === 'ELEVE'
                            ? 'border-[#2563EB] bg-blue-50/50 shadow-xs ring-1 ring-[#2563EB]'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                >
                    <span className="text-[14px] font-medium text-[#2563EB]">Élèves</span>
                    <span className="mt-1 text-[18px] font-extrabold text-[#0F172A]">{roleCounts.ELEVE}</span>
                </button>
            </div>

            <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">

                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#64748B]">
                            🔍
                        </span>
                        <input
                            type="text"
                            placeholder="Rechercher par nom, prénom, email ou identifiant..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] pl-9 pr-8 py-2 text-[14px] text-[#0F172A] placeholder:text-[#64748B] focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                                title="Effacer la recherche"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <label className="text-[14px] font-medium text-[#64748B] whitespace-nowrap">
                                Rôle:
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-[14px] font-medium text-[#0F172A] focus:bg-white focus:border-[#2563EB] focus:outline-none cursor-pointer"
                            >
                                <option value="ALL">Tous les rôles</option>
                                <option value="ADMIN">Administrateurs</option>
                                <option value="REF">Référents</option>
                                <option value="FORMATEUR">Formateurs</option>
                                <option value="ELEVE">Élèves</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-[14px] font-medium text-[#64748B] whitespace-nowrap">
                                Trier par:
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-[14px] font-medium text-[#0F172A] focus:bg-white focus:border-[#2563EB] focus:outline-none cursor-pointer"
                            >
                                <option value="name_asc">Nom (A → Z)</option>
                                <option value="name_desc">Nom (Z → A)</option>
                                <option value="email_asc">Email</option>
                                <option value="role">Rôle</option>
                            </select>
                        </div>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] font-semibold text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors cursor-pointer"
                            >
                                <span>↺</span> Réinitialiser
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[14px] text-[#64748B]">
                    <div>
                        Affichage de <strong className="text-[#0F172A]">{filteredAndSortedUsers.length}</strong> utilisateurs
                        {users.length !== filteredAndSortedUsers.length && ` (sur ${users.length} au total)`}
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Nombre d'utilisateur par page :</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="rounded-lg border border-slate-200 px-2 py-0.5 text-[14px] bg-white cursor-pointer"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-slate-200 bg-[#F8FAFC]">
                            <th scope="col" className="px-6 py-3.5 text-[14px] font-bold text-[#64748B] uppercase tracking-wider">
                                Nom & Prénom
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-[14px] font-bold text-[#64748B] uppercase tracking-wider">
                                Identifiant
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-[14px] font-bold text-[#64748B] uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-[14px] font-bold text-[#64748B] uppercase tracking-wider">
                                Rôle
                            </th>
                            <th scope="col" className="px-6 py-3.5 text-[14px] font-bold text-[#64748B] uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[14px] text-[#64748B]">
                                    <div className="inline-flex items-center gap-2 animate-pulse">
                                        ⏳ Chargement des utilisateurs...
                                    </div>
                                </td>
                            </tr>
                        ) : filteredAndSortedUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[14px] text-[#64748B]">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <span className="text-[28px]">🔎</span>
                                        <p className="font-semibold text-[#0F172A]">Aucun utilisateur trouvé</p>
                                        <p className="text-[14px]">
                                            {hasActiveFilters
                                                ? "Essayez de modifier ou de réinitialiser vos critères de recherche."
                                                : "Aucun utilisateur n'est encore enregistré dans la base."}
                                        </p>
                                        {hasActiveFilters && (
                                            <button
                                                onClick={handleResetFilters}
                                                className="mt-2 text-[14px] font-bold text-[#2563EB] underline hover:text-blue-700 cursor-pointer"
                                            >
                                                Réinitialiser les filtres
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition-colors hover:bg-slate-50/80"
                                >
                                    <td className="px-6 py-4 text-[14px] font-semibold text-[#0F172A] whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-bold text-[#2563EB] text-[14px]">
                                                {(user.first_name?.[0] || 'U').toUpperCase()}
                                                {(user.last_name?.[0] || '').toUpperCase()}
                                            </div>
                                            <div>
                                                <div>{user.last_name} {user.first_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-[#64748B] whitespace-nowrap">
                                        {user.username}
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
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[15px] text-[#64748B] transition-colors hover:bg-blue-50 hover:text-[#2563EB] cursor-pointer"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                type="button"
                                                title="Supprimer l'utilisateur"
                                                aria-label="Supprimer"
                                                onClick={() => setDeletingUser(user)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[15px] text-[#64748B] transition-colors hover:bg-red-50 hover:text-[#EF4444] cursor-pointer"
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

                {filteredAndSortedUsers.length > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 bg-[#F8FAFC] px-6 py-3 text-[14px] text-[#64748B]">
                        <div>
                            Page <strong className="text-[#0F172A]">{currentPage}</strong> sur <strong className="text-[#0F172A]">{totalPages}</strong>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-medium text-[#0F172A] shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                            >
                                Précédent
                            </button>

                            <div className="flex items-center gap-1 px-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`h-7 w-7 rounded-lg text-[14px] font-semibold transition-all cursor-pointer ${
                                            currentPage === page
                                                ? 'bg-[#2563EB] text-white'
                                                : 'bg-white text-[#64748B] hover:bg-slate-100 border border-slate-200'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-medium text-[#0F172A] shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                )}
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