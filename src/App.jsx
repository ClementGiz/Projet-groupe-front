import './App.css'
import { getCurrentUser, logout } from "./services/authService";
import { RefadminView } from "./components/views/RefAdmin/RefAdminView.jsx";
import { useEffect, useState } from "react";
import { Login } from "./components/views/Authenfication/Login.jsx";
import  Profil  from "./components/views/Profil/ProfilView.jsx";
import Header from "./components/layouts/Header.jsx";
import Footer from "./components/layouts/Footer.jsx";
import { Routes, Route } from "react-router-dom";

export const App = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };

        checkAuthentication();
    }, []);

    const handleLogin = (user) => {
        setUser(user);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    switch (user.role) {

        /* case "ADMIN":
            return (
                <>
                    <Header
                        user={user}
                        onLogout={handleLogout}
                    />

                    <Routes>
                        <Route
                            path="/profil"
                            element={
                                <Profil
                                    user={user}
                                    onLogout={handleLogout}
                                />
                            }
                        />

                        <Route
                            path="/*"
                            element={
                                <AdminView
                                    user={user}
                                    onLogout={handleLogout}
                                />
                            }
                        />
                    </Routes>

                    <Footer />
                </>
            ); */

        case "REF":
            return (
                <>
                    <div className="flex flex-col min-h-screen">
                        <Header
                            user={user}
                            onLogout={handleLogout}
                        />

                        <div className="flex-1">
                            <Routes>
                                <Route
                                    path="/profil"
                                    element={
                                        <Profil
                                            user={user}
                                            onLogout={handleLogout}
                                        />
                                    }
                                />

                                <Route
                                    path="/*"
                                    element={
                                        <RefadminView
                                            user={user}
                                            onLogout={handleLogout}
                                        />
                                    }
                                />
                            </Routes>
                        </div>

                        <Footer />
                    </div>
                </>
            );

        /* case "FORMATEUR":
            return (
                <>
                    <Header
                        user={user}
                        onLogout={handleLogout}
                    />

                    <Routes>
                        <Route
                            path="/profil"
                            element={
                                <Profil
                                    user={user}
                                    onLogout={handleLogout}
                                />
                            }
                        />

                        <Route
                            path="/*"
                            element={
                                <FormateurView
                                    user={user}
                                    onLogout={handleLogout}
                                />
                            }
                        />
                    </Routes>

                    <Footer />
                </>
            ); */

        /* case "ELEVE":
            return (
                <>
                    <Header
                        user={user}
                        onLogout={handleLogout}
                    />

                    <Routes>
                        <Route
                            path="/profil"
                            element={
                                <Profil
                                    user={user}
                                    onLogout={handleLogout}
                                />
                            }
                        />

                        <Route
                            path="/*"
                            element={
                                <EleveView
                                    user={user}
                                    onLogout={handleLogout}
                                />
                            }
                        />
                    </Routes>

                    <Footer />
                </>
            ); */

        default:
            handleLogout();
            return null;
    }
};

export default App