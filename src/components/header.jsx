import { Link } from "react-router-dom";


function Header() {
    return (
        <header className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-2xl">
                        🎓
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">
                            Service Pédagogique
                        </h1>
                        <p className="text-sm text-blue-100">
                            Gestion des étudiants et des enseignants
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">

                    <Link to="/" className="text-white hover:text-yellow-300 transition">
                        Accueil
                    </Link>

                    <Link to="/about" className="text-white hover:text-yellow-300 transition">
                        À propos
                    </Link>

                    <Link to="/contact" className="text-white hover:text-yellow-300 transition">
                        Contact
                    </Link>

                    <Link to="/login" className="border border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-blue-700 transition">
                        Connexion
                    </Link>

                    <Link to="/register" className="bg-yellow-400 text-blue-900 font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition">
                        Inscription
                    </Link>

                </nav>

            </div>
        </header>
    );
}

export default Header;