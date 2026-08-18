import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Header = ({ user, onLogout }) => {

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { label: "Promotions", path: "/promotions" },
        { label: "Filières", path: "/filieres" },
        { label: "Cursus", path: "/cursus" },
        { label: "Cours", path: "/cours" },
        { label: "Élèves", path: "/eleves" },
        { label: "Calendrier", path: "/calendrier" },
    ];

    const navLinkClass = ({ isActive }) =>
        `relative text-sm font-medium transition-colors duration-200 ${
            isActive
                ? "text-[#2563EB]"
                : "text-[#64748B] hover:text-[#2563EB]"
        }`;

    const handleLogout = () => {
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
        onLogout();
    };

    /*
     * Permet d'obtenir la première lettre
     * du nom de l'utilisateur pour l'avatar.
     */
    const getUserInitial = () => {
        if (!user) {
            return "?";
        }

        return (
            user.first_name?.charAt(0) ||
            user.username?.charAt(0) ||
            "?"
        ).toUpperCase();
    };

    /*
     * Nom affiché dans le Header.
     */
    const getUserName = () => {
        if (!user) {
            return "";
        }

        if (user.first_name || user.last_name) {
            return `${user.first_name || ""} ${user.last_name || ""}`.trim();
        }

        return user.username || "";
    };

    /*
     * Traduction du rôle technique de l'API
     * vers un rôle lisible.
     */
    const getUserRole = () => {
        if (!user?.role) {
            return "";
        }

        switch (user.role) {
            case "ADMIN":
                return "Administrateur";

            case "REF":
                return "Référente administrative";

            case "FORMATEUR":
                return "Formateur";

            case "ELEVE":
                return "Élève";

            default:
                return user.role;
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <div
                            className="
                                w-10
                                h-10
                                bg-[#2563EB]
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-white
                                font-bold
                                text-lg
                            "
                        >
                            BM
                        </div>

                        <div className="hidden sm:block">

                            <h1 className="text-base font-bold text-[#172A3A]">
                                Service pédagogique
                            </h1>

                            <p className="text-xs text-[#64748B]">
                                Gestion des formations
                            </p>

                        </div>
                    </Link>

                    {/* Navigation ordinateur */}
                    <nav
                        className="hidden lg:flex items-center gap-6"
                        aria-label="Navigation principale"
                    >

                        {navigation.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                className={navLinkClass}
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.label}

                                        {isActive && (
                                            <span
                                                className="
                                                    absolute
                                                    -bottom-[22px]
                                                    left-0
                                                    right-0
                                                    h-0.5
                                                    bg-[#2563EB]
                                                    rounded-full
                                                "
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>

                        ))}

                    </nav>

                    {/* Partie utilisateur */}
                    <div className="flex items-center gap-3">

                        {/* Informations utilisateur */}
                        <div className="hidden xl:block text-right">

                            <p className="text-sm font-semibold text-[#172A3A]">
                                {getUserName()}
                            </p>

                            <p className="text-xs text-[#64748B]">
                                {getUserRole()}
                            </p>

                        </div>

                        {/* Menu utilisateur */}
                        <div className="relative">

                            <button
                                type="button"
                                onClick={() =>
                                    setUserMenuOpen(!userMenuOpen)
                                }
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-[#F1F5F9]
                                    text-[#172A3A]
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-[#E2E8F0]
                                    transition-colors
                                    duration-200
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-[#2563EB]
                                    focus:ring-offset-2
                                "
                                aria-label="Ouvrir le menu utilisateur"
                                aria-expanded={userMenuOpen}
                            >
                                {getUserInitial()}
                            </button>

                            {userMenuOpen && (

                                <div
                                    className="
                                        absolute
                                        right-0
                                        mt-3
                                        w-64
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-lg
                                        shadow-lg
                                        overflow-hidden
                                        z-50
                                    "
                                >

                                    {/* Informations */}
                                    <div className="px-4 py-4 border-b border-gray-100">

                                        <p className="text-sm font-semibold text-[#172A3A]">
                                            {getUserName()}
                                        </p>

                                        <p className="text-xs text-[#64748B] mt-1">
                                            {getUserRole()}
                                        </p>

                                    </div>

                                    {/* Actions */}
                                    <div className="py-2">

                                        <Link
                                            to="/profil"
                                            onClick={() =>
                                                setUserMenuOpen(false)
                                            }
                                            className="
                                                block
                                                px-4
                                                py-2
                                                text-sm
                                                text-[#64748B]
                                                hover:bg-[#F8FAFC]
                                                hover:text-[#2563EB]
                                                transition
                                            "
                                        >
                                            Mon profil
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="
                                                w-full
                                                text-left
                                                px-4
                                                py-2
                                                text-sm
                                                text-red-600
                                                hover:bg-red-50
                                                transition
                                            "
                                        >
                                            Se déconnecter
                                        </button>

                                    </div>

                                </div>

                            )}

                        </div>

                        {/* Bouton menu mobile */}
                        <button
                            type="button"
                            onClick={() =>
                                setMobileMenuOpen(!mobileMenuOpen)
                            }
                            className="
                                lg:hidden
                                w-10
                                h-10
                                rounded-lg
                                border
                                border-gray-200
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-1
                                hover:bg-[#F8FAFC]
                                transition
                            "
                            aria-label="Ouvrir le menu de navigation"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="w-5 h-0.5 bg-[#172A3A]" />
                            <span className="w-5 h-0.5 bg-[#172A3A]" />
                            <span className="w-5 h-0.5 bg-[#172A3A]" />
                        </button>

                    </div>

                </div>

                {/* Navigation mobile */}
                {mobileMenuOpen && (

                    <nav
                        className="lg:hidden border-t border-gray-200 py-4"
                        aria-label="Navigation mobile"
                    >

                        <div className="flex flex-col gap-1">

                            {navigation.map((item) => (

                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/"}
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className={({ isActive }) =>
                                        `px-3 py-3 rounded-lg text-sm font-medium transition ${
                                            isActive
                                                ? "bg-blue-50 text-[#2563EB]"
                                                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2563EB]"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>

                            ))}

                        </div>

                    </nav>

                )}

            </div>

        </header>
    );
};

export default Header;