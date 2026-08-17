import api from './api'; // adapte le chemin si ton instance axios est ailleurs


export const getFilieres = () => api.get('/filieres/');
export const createFiliere = (data) => api.post('/filieres/', data);
export const updateFiliere = (id, data) => api.patch(`/filieres/${id}/`, data);

export const getCursusList = () => api.get('/cursus/');
export const createCursus = (data) => api.post('/cursus/', data);
export const updateCursus = (id, data) => api.patch(`/cursus/${id}/`, data);

export const getPromotions = () => api.get('/promotions/');
export const createPromotion = (data) => api.post('/promotions/', data);
export const updatePromotion = (id, data) => api.patch(`/promotions/${id}/`, data);


// promotionId optionnel : filtre les élèves d'une promotion donnée
export const getEleves = (promotionId) =>
    api.get('/eleves/', promotionId ? { params: { promotion: promotionId } } : undefined);

export const updateEleve = (id, data) => api.patch(`/eleves/${id}/`, data);