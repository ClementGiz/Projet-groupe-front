import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    Gestion d’un service pédagogique
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                        Accueil
                    </Link>

                    <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                        Connexion
                    </Link>

                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Inscription
                    </Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;