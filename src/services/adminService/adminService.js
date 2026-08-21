import api from '../api.js';

export const getUsers = () => api.get('/admin/users/');

export const createUser = (data) => api.post('/admin/users/', data);

export const updateUser = (id, data) => api.patch(`/admin/users/${id}/`, data);

export const deleteUser = (id) => api.delete(`/admin/users/${id}/`);

export const getPromotions = () => api.get('/promotions/');