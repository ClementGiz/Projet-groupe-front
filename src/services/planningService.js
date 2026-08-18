import api from './api';

/**
 * Récupère le planning spécifique de l'utilisateur connecté
 * (Élève, Formateur ou Admin)
 */
export const getMyPlanning = async () => {
    try {
        const response = await api.get('/planning/me/');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du planning :", error);
        throw error;
    }
};

/**
 * Récupère le détail d'un cours spécifique par son ID (optionnel)
 */
export const getCourseDetail = async (courseId) => {
    try {
        const response = await api.get(`/cours-donnes/${courseId}/`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du cours ${courseId} :`, error);
        throw error;
    }
};