import { useMemo, useState } from "react";
import "./style.css";

export const AdminView = ({ user, onLogout }) => {

    const [activePage, setActivePage] = useState("dashboard");
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);


    // =========================================
    // DONNÉES TEMPORAIRES FRONT-END
    // Plus tard : données récupérées depuis l'API
    // =========================================

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Jean Martin",
            email: "jean.martin@email.fr",
            role: "FORMATEUR",
            active: true,
        },
        {
            id: 2,
            name: "Sophie Bernard",
            email: "sophie.bernard@email.fr",
            role: "ELEVE",
            active: true,
        },
        {
            id: 3,
            name: "Claire Dupont",
            email: "claire.dupont@email.fr",
            role: "REF",
            active: false,
        },
        {
            id: 4,
            name: "Admin Principal",
            email: "admin@email.fr",
            role: "ADMIN",
            active: true,
        },
    ]);


    // =========================================
    // RECHERCHE
    // =========================================

    const filteredUsers = useMemo(() => {

        const value = search
            .toLowerCase()
            .trim();

        if (!value) {
            return users;
        }

        return users.filter((currentUser) => {

            return (
                currentUser.name
                    .toLowerCase()
                    .includes(value) ||

                currentUser.email
                    .toLowerCase()
                    .includes(value) ||

                currentUser.role
                    .toLowerCase()
                    .includes(value)
            );

        });

    }, [search, users]);


    // =========================================
    // STATISTIQUES
    // =========================================

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (currentUser) => currentUser.active
    ).length;

    const inactiveUsers = users.filter(
        (currentUser) => !currentUser.active
    ).length;

    const admins = users.filter(
        (currentUser) => currentUser.role === "ADMIN"
    ).length;


    // =========================================
    // ACTIVER / DÉSACTIVER
    // =========================================

    const handleToggleStatus = (id) => {

        setUsers((previousUsers) =>
            previousUsers.map((currentUser) => {

                if (currentUser.id === id) {

                    return {
                        ...currentUser,
                        active: !currentUser.active,
                    };

                }

                return currentUser;

            })
        );

    };


    // =========================================
    // MODIFIER LE RÔLE
    // =========================================

    const handleRoleChange = (id, newRole) => {

        setUsers((previousUsers) =>
            previousUsers.map((currentUser) => {

                if (currentUser.id === id) {

                    return {
                        ...currentUser,
                        role: newRole,
                    };

                }

                return currentUser;

            })
        );

        setSelectedUser(null);

    };


    // =========================================
    // SUPPRESSION
    // =========================================

    const handleDelete = () => {

        if (!userToDelete) {
            return;
        }

        setUsers((previousUsers) =>
            previousUsers.filter(
                (currentUser) =>
                    currentUser.id !== userToDelete.id
            )
        );

        setUserToDelete(null);

    };


    return (
        <div className="admin-page">

            <div className="admin-container">

                {/* =====================================
                    TITRE
                ====================================== */}

                <div className="admin-heading">
                    <div>
                        <h1 className="admin-title">
                            Administration
                        </h1>
                        <p className="admin-subtitle">
                            Gestion des comptes, des rôles et des accès.
                        </p>
                    </div>


                    <div className="admin-user-info">
                        <p className="admin-user-name">
                            {user?.first_name || user?.username || "Administrateur"}
                        </p>
                        <p className="admin-small-text">
                            Administrateur
                        </p>
                    </div>
                </div>


                {/* =====================================
                    NAVIGATION
                ====================================== */}

                <div className="admin-navigation">

                    <div className="admin-navigation-list">

                        <NavigationButton
                            label="Tableau de bord"
                            active={activePage === "dashboard"}
                            onClick={() => setActivePage("dashboard") }/>

                        <NavigationButton
                            label="Comptes utilisateurs"
                            active={activePage === "users"}
                            onClick={() => setActivePage("users")}/>

                        <NavigationButton
                            label="Rôles et accès"
                            active={activePage === "access"}
                            onClick={() => setActivePage("access")}/>
                    </div>
                </div>


                {/* =====================================
                    ACCEUIL
                ====================================== */}

                {activePage === "dashboard" && (
                    <section>
                        <div>
                            <h2 className="admin-section-title">
                                Vue d'ensemble
                            </h2>
                            <p className="admin-subtitle">
                                Consultez rapidement l'état des comptes utilisateurs.
                            </p>
                        </div>
                        <div
                            className="admin-stats-grid"
                            style={{ marginTop: "1.5rem" }}>
                            <StatCard label="Utilisateurs" value={totalUsers}/>
                            <StatCard label="Comptes actifs" value={activeUsers}/>
                            <StatCard label="Comptes désactivés" value={inactiveUsers}/>
                            <StatCard label="Administrateurs" value={admins}/>
                        </div>

                        {/* Actions rapides */}
                        <div className="admin-card admin-actions-card">
                            <h2 className="admin-section-title">
                                Actions rapides
                            </h2>
                            <p className="admin-subtitle">
                                Accédez rapidement aux fonctions administratives.
                            </p>
                            <div className="admin-actions">
                                <button
                                    type="button"
                                    className="admin-button admin-button-primary"
                                    onClick={() => setActivePage("users")}>
                                    Gérer les comptes
                                </button>
                                <button type="button"
                                    className="admin-button admin-button-secondary"
                                    onClick={() => setActivePage("access")}>
                                    Contrôler les accès
                                </button>
                            </div>
                        </div>
                    </section>
                )}


                {/* =====================================
                    COMPTES UTILISATEURS
                ====================================== */}

                {activePage === "users" && (
                    <section className="admin-users-section">
                        {/* Header */}
                        <div className="admin-users-header">
                            <div className="admin-users-header-content">
                                <div>
                                    <h2 className="admin-section-title">
                                        Comptes utilisateurs
                                    </h2>
                                    <p className="admin-subtitle">
                                        Consultez, activez, désactivez ou supprimez un compte.
                                    </p>

                                </div>

                                <button type="button" className="admin-button admin-button-primary">
                                    Ajouter un compte
                                </button>
                            </div>
                        </div>

                        {/* Recherche */}

                        <div className="admin-search-container">

                            <label htmlFor="userSearch" className="admin-label">
                                Rechercher
                            </label>
                            <input
                                id="userSearch"
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Nom, e-mail ou rôle..."
                                className="admin-input"/>
                        </div>
                        {/* Tableau */}
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>
                                        Utilisateur
                                    </th>

                                    <th>
                                        E-mail
                                    </th>

                                    <th>
                                        Rôle
                                    </th>

                                    <th>
                                        Statut
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5">
                                            Aucun utilisateur trouvé.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map(
                                        (currentUser) => (
                                            <tr key={currentUser.id}>
                                                <td>
                                                    <span className="admin-table-user"> {currentUser.name}
                                                        </span>
                                                </td>
                                                <td>
                                                    {currentUser.email}
                                                </td>
                                                <td>
                                                    <RoleBadge role={currentUser.role}/>

                                                </td>
                                                <td>
                                                    <StatusBadge active={currentUser.active}/>
                                                </td>
                                                <td>
                                                    <div className="admin-table-actions">
                                                        <button type="button"
                                                            className="admin-action-link admin-action-edit"
                                                            onClick={() => setSelectedUser(currentUser)}>
                                                            Modifier
                                                        </button>

                                                        <button type="button"
                                                            className="admin-action-link admin-action-status"
                                                            onClick={() => handleToggleStatus(currentUser.id)}>
                                                            {currentUser.active
                                                                ? "Désactiver"
                                                                : "Activer"}

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="admin-action-link admin-action-delete"
                                                            onClick={() => setUserToDelete(currentUser)}>
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}


                {/* =====================================
                    RÔLES ET ACCÈS
                ====================================== */}

                {activePage === "access" && (
                    <section>
                        <div>
                            <h2 className="admin-section-title"> Rôles et accès
                            </h2>
                            <p className="admin-subtitle">
                                Consultez les droits associés aux différents rôles.
                            </p>
                        </div>
                        <div
                            className="admin-access-grid"
                            style={{ marginTop: "1.5rem" }}>

                            <AccessCard
                                role="Administrateur"
                                code="ADMIN"
                                permissions={[
                                    "Gérer les comptes utilisateurs",
                                    "Attribuer les rôles",
                                    "Activer ou désactiver un compte",
                                    "Supprimer des données",]}/>


                            <AccessCard
                                role="Référente administrative"
                                code="REF"
                                permissions={[
                                    "Gérer les filières",
                                    "Gérer les cursus",
                                    "Gérer les cours",
                                    "Gérer les promotions",
                                    "Inscrire les élèves",]}/>


                            <AccessCard
                                role="Formateur"
                                code="FORMATEUR"
                                permissions={[
                                    "Consulter ses cours",
                                    "Consulter son calendrier",]}/>

                            <AccessCard
                                role="Élève"
                                code="ELEVE"
                                permissions={[
                                    "Consulter son calendrier",
                                    "Consulter ses cours",]}/>
                        </div>
                    </section>
                )}

                {/* =====================================
                    DÉCONNEXION
                ====================================== */}

                <div className="admin-logout-container">
                    <button
                        type="button"
                        className="admin-logout"
                        onClick={onLogout}>
                        Se déconnecter
                    </button>
                </div>
            </div>


            {/* =====================================
                MODALE MODIFICATION RÔLE
            ====================================== */}

            {selectedUser && (
                <EditRoleModal
                    user={selectedUser}
                    onClose={() =>
                        setSelectedUser(null)
                    }
                    onSave={handleRoleChange}
                />
            )}


            {/* =====================================
                MODALE SUPPRESSION
            ====================================== */}

            {userToDelete && (
                <DeleteModal
                    user={userToDelete}
                    onClose={() =>
                        setUserToDelete(null)
                    }
                    onConfirm={handleDelete}
                />
            )}

        </div>
    );
};


/* =========================================
   NAVIGATION BUTTON
   ========================================= */

const NavigationButton = ({
                              label,
                              active,
                              onClick,
                          }) => {

    return (

        <button
            type="button"
            onClick={onClick}
            className={ active
                    ? "admin-nav-button admin-nav-button-active"
                    : "admin-nav-button"}>
            {label}
        </button>
    );
};


/* =========================================
   STAT CARD
   ========================================= */

const StatCard = ({ label, value }) => {
    return (
        <div className="admin-card">
            <p className="admin-stat-label">
                {label}
            </p>
            <p className="admin-stat-value">
                {value}
            </p>
        </div>
    );
};


/* =========================================
   STATUS BADGE
   ========================================= */

const StatusBadge = ({ active }) => {
    return (
        <span
            className={active
                    ? "admin-status-badge admin-status-active"
                    : "admin-status-badge admin-status-inactive"}>
            {active
                ? "Actif"
                : "Désactivé"}
        </span>
    );
};


/* =========================================
   ROLE BADGE
   ========================================= */

const RoleBadge = ({ role }) => {
    return (<span className="admin-role-badge">
            {role}
        </span>);
};


/* =========================================
   ACCESS CARD
   ========================================= */

const AccessCard = ({
                        role,
                        code,
                        permissions,}) => {
    return (
        <div className="admin-card">
            <div className="admin-access-header">
                <h3 className="admin-access-title">
                    {role}
                </h3>
                <span className="admin-access-code">
                    {code}
                </span>
            </div>


            <ul className="admin-permission-list">
                {permissions.map(
                    (permission) => (
                        <li key={permission} className="admin-permission">
                            <span className="admin-permission-check">
                                ✓
                            </span>

                            <span> {permission}
                            </span>
                        </li>)
                )}
            </ul>
        </div>
    );
};


/* =========================================
   MODALE MODIFICATION RÔLE
   ========================================= */

const EditRoleModal = ({user, onClose, onSave,}) => {
                                        const [role, setRole] = useState(user.role);

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal">
                <h2 className="admin-modal-title">
                    Modifier le rôle
                </h2>
                <p className="admin-modal-text">
                    Utilisateur :{" "}
                    <strong>
                        {user.name}
                    </strong>
                </p>
                <div className="admin-modal-form">
                    <label htmlFor="role" className="admin-label"> Rôle
                    </label>


                    <select id="role" value={role}
                        onChange={(event) =>
                            setRole(event.target.value)}
                         className="admin-select">
                        <option value="ADMIN"> Administrateur
                        </option>

                        <option value="REF">  Référente administrative
                        </option>

                        <option value="FORMATEUR"> Formateur
                        </option>

                        <option value="ELEVE"> Élève
                        </option>
                    </select>
                </div>


                <div className="admin-modal-actions">
                    <button type="button" className="admin-button admin-button-cancel" onClick={onClose}>
                        Annuler
                    </button>


                    <button type="button" className="admin-button admin-button-primary" onClick={() => onSave(user.id, role)}>
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};


/* =========================================
   MODALE SUPPRESSION
   ========================================= */

const DeleteModal = ({user, onClose, onConfirm,}) => {
    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal">
                <h2 className="admin-modal-title">
                    Supprimer cet utilisateur ?
                </h2>

                <p className="admin-modal-text">
                    Vous êtes sur le point de supprimer le compte de{" "}
                    <strong>{user.name}
                    </strong>.

                </p>
                <div className="admin-delete-warning">
                    Cette action peut être irréversible.
                </div>
                <div className="admin-modal-actions">
                    <button type="button" className="admin-button admin-button-cancel" onClick={onClose}>
                        Annuler
                    </button>
                    <button type="button" className="admin-button admin-button-danger" onClick={onConfirm}>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};