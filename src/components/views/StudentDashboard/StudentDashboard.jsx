import react, { useState, useEffect} from "react";
import Calendar from "../../elements/Calendar.jsx";
import { getMyPlanning } from '../services/planningService';
import { getCurrentUser } from "../../../services/authService";
import { getCurrentUser } from "../../../services/authService.js"
import {useNavigate} from "react-router-dom";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [upcomingCourses, setUpcomingCourse] = useState([]);
    const [loading, setLoadingg] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Récupération de l'èlève connecté via authService
                const userData = await getCurrentUser();
                setUser(userData)

                // Récupération des cours via planningService
                const data = await getMyPlanning();
                const list = Array.isArray(data) ? data : (data.cours_donnes || [])

                // Filtrer et trier les cours à venir
                const today = new Date().toISOString().split('T')[0];
                const upcoming = list
                    .filter(c => c.date_debut >= today)
                    .sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut))
                    .slice(0, 4);

                setUpcomingCourse(upcoming)

            } catch (err) {
                console.error("Erreur chargement dachboard", err);
                setError("Impossible de charger le planning pour le moment.")
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    return (
        <div className=>

        </div>
    )
}