import { useState } from "react";
import {login} from "../../../services/authService.js";

export const Login = ({ onLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
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
        <div>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="username">
                        Nom d'utilisateur
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Mot de passe
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                </div>

                {error && (
                    <p>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Connexion..."
                        : "Se connecter"
                    }
                </button>

            </form>
        </div>
    );
};