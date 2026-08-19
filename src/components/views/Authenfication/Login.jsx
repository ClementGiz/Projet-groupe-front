import { useState } from "react";
import { login } from "../../../services/auth/authService.js";

export const Login = ({ onLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!username.trim() || !password.trim()) {
            setError(
                "Veuillez renseigner votre nom d'utilisateur et votre mot de passe."
            );
            return;
        }

        setLoading(true);

        try {
            const data = await login(username, password);

            console.log("DATA LOGIN :", data);
            console.log("USER LOGIN :", data.user);

            onLogin(data.user);

        } catch (error) {

            if (error.response) {
                setError(
                    error.response.data.message ||
                    error.response.data.detail ||
                    "Identifiants incorrects."
                );
            } else {
                setError(
                    "Impossible de contacter le serveur."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md">

                {/* Identité de l'application */}
                <div className="text-center mb-6">

                    <div className="flex justify-center mb-4">
                        <div
                            className="
                                w-16
                                h-16
                                rounded-lg
                                bg-[#2563EB]
                                flex
                                items-center
                                justify-center
                                text-white
                                text-xl
                                font-bold
                                shadow-sm
                            "
                        >
                            BM
                        </div>
                    </div>

                    <p className="text-sm font-semibold text-[#2563EB]">
                        Service pédagogique
                    </p>

                </div>

                {/* Carte de connexion */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">

                    {/* Titre */}
                    <div className="text-center mb-8">

                        <h1 className="text-2xl font-bold text-[#172A3A]">
                            Connexion
                        </h1>

                        <p className="text-sm text-[#64748B] mt-2">
                            Accédez à votre espace pédagogique
                        </p>

                    </div>

                    {/* Formulaire */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Nom d'utilisateur */}
                        <div>

                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-[#172A3A] mb-2"
                            >
                                Nom d'utilisateur
                            </label>

                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                placeholder="Votre nom d'utilisateur"
                                disabled={loading}
                                required
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-lg
                                    text-sm
                                    text-[#172A3A]
                                    placeholder:text-gray-400
                                    outline-none
                                    transition
                                    focus:border-[#2563EB]
                                    focus:ring-2
                                    focus:ring-blue-100
                                    disabled:bg-gray-100
                                    disabled:cursor-not-allowed
                                "
                            />

                        </div>

                        {/* Mot de passe */}
                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#172A3A] mb-2"
                            >
                                Mot de passe
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Votre mot de passe"
                                    disabled={loading}
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        pr-20
                                        border
                                        border-gray-300
                                        rounded-lg
                                        text-sm
                                        text-[#172A3A]
                                        placeholder:text-gray-400
                                        outline-none
                                        transition
                                        focus:border-[#2563EB]
                                        focus:ring-2
                                        focus:ring-blue-100
                                        disabled:bg-gray-100
                                        disabled:cursor-not-allowed
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    disabled={loading}
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-xs
                                        font-medium
                                        text-[#64748B]
                                        hover:text-[#2563EB]
                                        transition
                                        disabled:cursor-not-allowed
                                    "
                                    aria-label={
                                        showPassword
                                            ? "Masquer le mot de passe"
                                            : "Afficher le mot de passe"
                                    }
                                >
                                    {showPassword
                                        ? "Masquer"
                                        : "Afficher"}
                                </button>

                            </div>

                        </div>

                        {/* Options */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        </div>

                        {/* Erreur */}
                        {error && (
                            <div
                                className="
                                    bg-red-50
                                    border
                                    border-red-200
                                    rounded-lg
                                    px-4
                                    py-3
                                "
                                role="alert"
                            >
                                <p className="text-sm text-red-700">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                min-h-12
                                bg-[#2563EB]
                                text-white
                                py-3
                                px-4
                                rounded-lg
                                text-sm
                                font-semibold
                                hover:bg-blue-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#2563EB]
                                focus:ring-offset-2
                                transition
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {loading
                                ? "Connexion en cours..."
                                : "Se connecter"
                            }
                        </button>

                    </form>

                    {/* Information */}
                    <div className="mt-7 pt-5 border-t border-gray-200">

                        <p className="text-xs text-center text-[#64748B] leading-5">
                            L'accès à cette application est réservé aux
                            utilisateurs disposant d'un compte autorisé.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};