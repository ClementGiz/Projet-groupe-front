import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Titre */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Connexion
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Connectez-vous à votre compte
                    </p>
                </div>

                {/* Formulaire */}
                <form className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Adresse email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="exemple@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Mot de passe oublié */}
                    <div className="flex justify-end">
                        <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-700"
                        >
                            Mot de passe oublié ?
                        </a>
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Se connecter
                    </button>

                </form>

                {/* Inscription */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Vous n'avez pas encore de compte ?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Créer un compte
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;