import './App.css'
import {getCurrentUser, logout,} from "./services/authService";
import {RefadminView} from "./components/views/RefAdmin/RefAdminView.jsx";
import {useEffect, useState} from "react";
import {Login} from "./components/views/Authenfication/Authentification.jsx";



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
                <AdminView
                    user={user}
                    onLogout={handleLogout}
                />
            );*/

        case "REF":
            return (
                <RefadminView
                    user={user}
                    onLogout={handleLogout}
                />
            );

       /* case "FORMATEUR":
           return (
               <FormateurView
                   user={user}
                    onLogout={handleLogout}
                />
            );

        case "ELEVE":
            return (
                <EleveView
                    user={user}
                    onLogout={handleLogout}
                );
*/
        default:
            handleLogout();
            return null;
    }
};


export default App
