import api from './api'; // Import de l'instance Axios centralisée

// Récupérer les données du profil de l'utilisateur connecté
export const getMyProfile = async () => {
    const response = await api.get('/profile/me/');
    return response.data;
};

// Mettre à jour les données du profil (PATCH)
export const updateMyProfile = async (profileData) => {
    const response = await api.patch('/profile/me/', profileData);
    return response.data;
};