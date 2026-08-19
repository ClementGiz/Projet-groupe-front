import api from '../api.js';


export const getFilieres = () => api.get('/filieres/');
export const createFiliere = (data) => api.post('/filieres/', data);
export const updateFiliere = (id, data) => api.patch(`/filieres/${id}/`, data);


export const getCursusList = () => api.get('/cursus/');
export const createCursus = (data) => api.post('/cursus/', data);
export const updateCursus = (id, data) => api.patch(`/cursus/${id}/`, data);


export const getPromotions = () => api.get('/promotions/');
export const createPromotion = (data) => api.post('/promotions/', data);
export const updatePromotion = (id, data) => api.patch(`/promotions/${id}/`, data);


export const getEleves = (promotionId) =>
    api.get('/eleves/', promotionId ? { params: { promotion: promotionId } } : undefined);

export const updateEleve = (id, data) => api.patch(`/eleves/${id}/`, data);


export const getFormateurs = () => api.get('/formateurs/');


export const getCoursDonnes = () => api.get('/cours-donnes/');
export const createCoursDonne = (data) => api.post('/cours-donnes/', data);
export const updateCoursDonne = (id, data) => api.patch(`/cours-donnes/${id}/`, data);
export const deleteCoursDonne = (id) => api.delete(`/cours-donnes/${id}/`);