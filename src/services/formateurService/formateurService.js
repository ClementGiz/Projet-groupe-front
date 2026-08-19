import api from '../api.js';

export const getMyCourses = () => api.get('/formateur/courses/me/');

export const getElevesByPromotion = (promotionId) => api.get(`/promotions/${promotionId}/eleves/`);