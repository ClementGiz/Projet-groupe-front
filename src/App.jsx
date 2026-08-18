import './App.css'
import {getCurrentUser, logout,} from "./services/authService";
import {RefadminView} from "./components/views/RefAdmin/RefAdminView.jsx";
import {useEffect, useState} from "react";
import  {Login} from "./components/views/Authenfication/Login.jsx";
import Header from "./components/layouts/Header.jsx";
import Footer from "./components/layouts/Footer.jsx";


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

    switch (user.role) {

      /*  case "ADMIN":
            return (
                <>
                <Header
                    user={user}
                    onLogout={handleLogout}
                />
                <AdminView
                    user={user}
                    onLogout={handleLogout}
                />
                <Footer />
                </>
            );*/

        case "REF":
            return (
                <>
                <Header
                    user={user}
                    onLogout={handleLogout}
                />
                <RefadminView
                    user={user}
                    onLogout={handleLogout}
                />
                <Footer />
                </>
            );

       /* case "FORMATEUR":
           return (
                <Header
                    user={user}
                    onLogout={handleLogout}
                />
                <FormateurView
                    user={user}
                    onLogout={handleLogout}
                />
                <Footer />
                </>
            );

        case "ELEVE":
            return (
                 <Header
                    user={user}
                    onLogout={handleLogout}
                />
                <EleveView
                    user={user}
                    onLogout={handleLogout}
                />
                <Footer />
                </>
                );
*/
        default:
            handleLogout();
            return null;
    }
};


export default App
