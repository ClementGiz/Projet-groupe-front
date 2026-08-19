import './App.css'
import {getCurrentUser, logout,} from "./services/auth/authService.js";
import {RefadminView} from "./components/views/RefAdmin/RefAdminView.jsx";
import {useEffect, useState} from "react";
import {Login} from "./components/views/Authenfication/Login.jsx";
import {AdminView} from "./components/Views/Administrateur/AdminView.jsx";
import {FormateurView} from "./components/Views/Formateur/FormateurView.jsx";
import Profil from "./components/views/Profil/ProfilView.jsx";
import Header from "./components/layouts/header.jsx";
import Footer from "./components/layouts/Footer.jsx";
import {Routes, Route} from "react-router-dom";

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
        console.log("USER APP :", user);
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
        return (
            <Login
                onLogin={handleLogin}
            />
        );
    }

    const renderActiveView = () => {
        switch (user.role) {
            case "ADMIN":
                return <AdminView user={user} onLogout={handleLogout}/>;
            case "REF":
                return <RefadminView user={user} onLogout={handleLogout}/>;
            case "FORMATEUR":
                return <FormateurView user={user} onLogout={handleLogout}/>;
            /*case "ELEVE":
                return <EleveView user={user} onLogout={handleLogout}/>;*/
            default:
                return (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <p className="text-[#EF4444] font-medium mb-4">Rôle non reconnu ou accès non autorisé.</p>
                        <button onClick={handleLogout}
                                className="bg-[#2563EB] text-white px-4 py-2 rounded-lg cursor-pointer">
                            Se déconnecter
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <Header user={user} onLogout={handleLogout}/>
            <main className="flex-grow">
                <Routes>
                    <Route path="/profil" element={<Profil user={user} onLogout={handleLogout}/>}/>
                    <Route path="/*" element={renderActiveView()}/>

                </Routes>
            </main>
            <Footer/>
        </div>
    );
};


export default App
