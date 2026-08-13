import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-8 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Présentation */}
                    <div>
                        <h2 className="text-2xl font-bold mb-3">
                            🎓 Service Pédagogique
                        </h2>

                        <p className="text-blue-100 leading-7">
                            Plateforme de gestion du service pédagogique permettant
                            d'administrer les étudiants, les enseignants et les formations.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">  Navigation
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="hover:text-yellow-300 transition">  Accueil
                                </Link>
                            </li>

                            <li>
                                <Link to="/login" className="hover:text-yellow-300 transition"> Connexion
                                </Link>
                            </li>

                            <li>
                                <Link to="/register" className="hover:text-yellow-300 transition"> Inscription
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4"> Contact
                        </h3>

                        <p className="text-blue-100">📧 monprojet@campus-eni.fr
                        </p>

                        <p className="text-blue-100 mt-2"> 📍 ENI École
                        </p>

                        <p className="text-blue-100"> France
                        </p>
                    </div>

                </div>

                <div className="border-t border-blue-500 mt-10 pt-6 text-center text-blue-100">
                    © 2026 <strong>ENI École</strong> — Tous droits réservés.
                </div>

            </div>
        </footer>
    );
}

export default Footer;