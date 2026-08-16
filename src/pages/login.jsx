import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Veuillez renseigner votre adresse e-mail et votre mot de passe.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            let data = {};

            try {
                data = await response.json();
            } catch {
                // Le backend n'a pas renvoyé de JSON exploitable
            }

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Adresse e-mail ou mot de passe incorrect.");
                }

                if (response.status === 403) {
                    throw new Error("Vous n'êtes pas autorisé à accéder à cette application.");
                }

                throw new Error(
                    data.message ||
                    data.detail ||
                    "Une erreur est survenue lors de la connexion."
                );
            }

            if (!data.access) {
                throw new Error(
                    "Le serveur n'a pas renvoyé de token d'authentification."
                );
            }


            localStorage.setItem("access_token", data.access);

            if (data.refresh) {
                localStorage.setItem("refresh_token", data.refresh);
            }

            /*
             * Préparation pour le Header.
             * Si le backend renvoie les informations utilisateur,
             * elles seront disponibles plus tard.
             */
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            localStorage.setItem(
                "remember_me",
                JSON.stringify(rememberMe)
            );

            navigate("/");
        } catch (err) {
            if (err instanceof TypeError) {
                setError(
                    "Impossible de contacter le serveur. Vérifiez que le backend est démarré."
                );
            } else {
                setError(
                    err.message || "Une erreur inattendue est survenue."
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
                                shadow-sm ">
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
                        noValidate
                    >

                        {/* E-mail */}
                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#172A3A] mb-2"
                            >
                                Adresse e-mail
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="prenom.nom@email.com"
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
                                    disabled:cursor-not-allowed "/>

                        </div>

                        {/* Mot de passe */}
                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#172A3A] mb-2">
                                Mot de passe
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                        disabled:cursor-not-allowed "/>

                                <button type="button" onClick={() =>
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
                                    {showPassword ? "Masquer" : "Afficher"}
                                </button>

                            </div>

                        </div>

                        {/* Options */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <label
                                htmlFor="rememberMe"
                                className="flex items-center gap-2 text-sm text-[#64748B] cursor-pointer"
                            >
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    disabled={loading}
                                    className="
                                        w-4
                                        h-4
                                        rounded
                                        border-gray-300
                                        accent-[#2563EB]"/>
                                Se souvenir de moi
                            </label>

                            <button
                                type="button"
                                className="text-sm text-[#2563EB] font-medium hover:underline text-left">
                                Mot de passe oublié ?
                            </button>

                        </div>

                        {/* Erreur */}
                        {error && (
                            <div
                                className="bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                                role="alert">
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
                                disabled:cursor-not-allowed ">
                            {loading
                                ? "Connexion en cours..."
                                : "Se connecter"}
                        </button>

                    </form>

                    {/* Information */}
                    <div className="mt-7 pt-5 border-t border-gray-200">

                        <p className="text-xs text-center text-[#64748B] leading-5">
                            L'accès à cette application est réservé aux utilisateurs
                            disposant d'un compte autorisé.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;