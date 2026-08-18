import { Link } from "react-router-dom";

export const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Présentation */}
                    <div>

                        <div className="flex items-center gap-3 mb-4">

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

                            <div>

                                <h2 className="text-base font-bold text-[#172A3A]">
                                    Service Pédagogique
                                </h2>

                                <p className="text-xs text-[#64748B]">
                                    Gestion des formations
                                </p>

                            </div>

                        </div>

                        <p className="text-sm text-[#64748B] leading-6 max-w-sm">
                            Plateforme de gestion du service pédagogique permettant
                            d'administrer les étudiants, les enseignants et les formations.
                        </p>

                    </div>

                    {/* Navigation */}
                    <div>

                        <h3 className="text-sm font-semibold text-[#172A3A] mb-4">
                            Navigation
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/"
                                    className="
                                        text-sm
                                        text-[#64748B]
                                        hover:text-[#2563EB]
                                        transition-colors
                                        duration-200
                                    "
                                >
                                    Accueil
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/profil"
                                    className="
                                        text-sm
                                        text-[#64748B]
                                        hover:text-[#2563EB]
                                        transition-colors
                                        duration-200
                                    "
                                >
                                    Mon profil
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}
                    <div>

                        <h3 className="text-sm font-semibold text-[#172A3A] mb-4">
                            Contact
                        </h3>

                        <div className="space-y-3">

                            <p className="text-sm text-[#64748B]">
                                📧 monprojet@campus-eni.fr
                            </p>

                            <div className="flex items-start gap-2">

                                <span>📍</span>

                                <div className="text-sm text-[#64748B]">

                                    <p>
                                        ENI École
                                    </p>

                                    <p className="mt-2">
                                        France
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Partie basse */}
                <div className="border-t border-gray-200 mt-8 pt-5">

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        items-center
                        justify-between
                        gap-3
                    ">

                        <p className="
                            text-xs
                            text-[#64748B]
                            text-center
                            sm:text-left
                        ">
                            © {currentYear}{" "}

                            <span className="font-semibold text-[#172A3A]">
                                ENI École
                            </span>{" "}

                            — Tous droits réservés.
                        </p>

                        <p className="text-xs text-[#64748B]">
                            Version 1.0
                        </p>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;