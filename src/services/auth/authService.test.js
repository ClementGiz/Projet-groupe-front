// authService.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login, logout, getToken, getCurrentUser } from './authService';
import api from '../api';

vi.mock('../api', () => ({
    __esModule: true,
    default: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

describe('authService', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('login stocke le token et retourne les données', async () => {
        api.post.mockResolvedValue({ data: { token: 'abc123', user: { id: 1 } } });

        const result = await login('maxence', 'pass');

        expect(api.post).toHaveBeenCalledWith('/auth/login/', {
            username: 'maxence',
            password: 'pass',
        });
        expect(localStorage.getItem('token')).toBe('abc123');
        expect(result.token).toBe('abc123');
    });

    it('logout supprime le token', () => {
        localStorage.setItem('token', 'abc123');
        logout();
        expect(localStorage.getItem('token')).toBeNull();
    });

    it('getToken retourne null si rien stocké', () => {
        expect(getToken()).toBeNull();
    });

    it('getCurrentUser retourne null sans token', async () => {
        const user = await getCurrentUser();
        expect(user).toBeNull();
        expect(api.get).not.toHaveBeenCalled();
    });

    it('getCurrentUser retourne les données si token valide', async () => {
        localStorage.setItem('token', 'abc123');
        api.get.mockResolvedValue({ data: { id: 1, username: 'maxence' } });

        const user = await getCurrentUser();

        expect(api.get).toHaveBeenCalledWith('/auth/me');
        expect(user.username).toBe('maxence');
    });

    it('getCurrentUser fait logout et retourne null si le call échoue', async () => {
        localStorage.setItem('token', 'abc123');
        api.get.mockRejectedValue(new Error('401'));

        const user = await getCurrentUser();

        expect(user).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
    });
});