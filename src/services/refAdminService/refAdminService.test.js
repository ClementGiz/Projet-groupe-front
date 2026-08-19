// refadminService.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../api';
import {
    getFilieres, createFiliere, updateFiliere,
    getCursusList, createCursus, updateCursus,
    getPromotions, createPromotion, updatePromotion,
    getEleves, updateEleve,
    getFormateurs,
    getCoursDonnes, createCoursDonne, updateCoursDonne, deleteCoursDonne,
} from './refadminService.js';

vi.mock('../api', () => ({
    __esModule: true,
    default: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

describe('refadminService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        api.get.mockResolvedValue({ data: [] });
        api.post.mockResolvedValue({ data: {} });
        api.patch.mockResolvedValue({ data: {} });
        api.delete.mockResolvedValue({ data: {} });
    });

    describe('filieres', () => {
        it('getFilieres appelle GET /filieres/', () => {
            getFilieres();
            expect(api.get).toHaveBeenCalledWith('/filieres/');
        });

        it('createFiliere appelle POST /filieres/ avec les données', () => {
            const data = { code: 'DEV', nom: 'Développement' };
            createFiliere(data);
            expect(api.post).toHaveBeenCalledWith('/filieres/', data);
        });

        it('updateFiliere appelle PATCH /filieres/:id/ avec les données', () => {
            const data = { nom: 'Développement Web' };
            updateFiliere(3, data);
            expect(api.patch).toHaveBeenCalledWith('/filieres/3/', data);
        });
    });

    describe('cursus', () => {
        it('getCursusList appelle GET /cursus/', () => {
            getCursusList();
            expect(api.get).toHaveBeenCalledWith('/cursus/');
        });

        it('createCursus appelle POST /cursus/ avec les données', () => {
            const data = { filiere_id: 1, code: 'DEV1', libelle: 'Cursus Dev' };
            createCursus(data);
            expect(api.post).toHaveBeenCalledWith('/cursus/', data);
        });

        it('updateCursus appelle PATCH /cursus/:id/ avec les données', () => {
            const data = { libelle: 'Cursus modifié' };
            updateCursus(5, data);
            expect(api.patch).toHaveBeenCalledWith('/cursus/5/', data);
        });
    });

    describe('promotions', () => {
        it('getPromotions appelle GET /promotions/', () => {
            getPromotions();
            expect(api.get).toHaveBeenCalledWith('/promotions/');
        });

        it('createPromotion appelle POST /promotions/ avec les données', () => {
            const data = { filiere_id: 1, nom: 'Promo A', date_debut: '2024-01-01', date_fin: '2024-06-01' };
            createPromotion(data);
            expect(api.post).toHaveBeenCalledWith('/promotions/', data);
        });

        it('updatePromotion appelle PATCH /promotions/:id/ avec les données', () => {
            const data = { nom: 'Promo A modifiée' };
            updatePromotion(2, data);
            expect(api.patch).toHaveBeenCalledWith('/promotions/2/', data);
        });
    });

    describe('eleves', () => {
        it('getEleves sans promotionId appelle GET /eleves/ sans params', () => {
            getEleves();
            expect(api.get).toHaveBeenCalledWith('/eleves/', undefined);
        });

        it('getEleves avec promotionId appelle GET /eleves/ avec le bon param', () => {
            getEleves(7);
            expect(api.get).toHaveBeenCalledWith('/eleves/', { params: { promotion: 7 } });
        });

        it('updateEleve appelle PATCH /eleves/:id/ avec les données', () => {
            const data = { promotion_id: 4 };
            updateEleve(10, data);
            expect(api.patch).toHaveBeenCalledWith('/eleves/10/', data);
        });
    });

    describe('formateurs', () => {
        it('getFormateurs appelle GET /formateurs/', () => {
            getFormateurs();
            expect(api.get).toHaveBeenCalledWith('/formateurs/');
        });
    });

    describe('coursDonnes', () => {
        it('getCoursDonnes appelle GET /cours-donnes/', () => {
            getCoursDonnes();
            expect(api.get).toHaveBeenCalledWith('/cours-donnes/');
        });

        it('createCoursDonne appelle POST /cours-donnes/ avec les données', () => {
            const data = { promotion_id: 1, cours_id: 2, formateur_id: 3, date_debut: '2024-01-01' };
            createCoursDonne(data);
            expect(api.post).toHaveBeenCalledWith('/cours-donnes/', data);
        });

        it('updateCoursDonne appelle PATCH /cours-donnes/:id/ avec les données', () => {
            const data = { date_fin: '2024-01-02' };
            updateCoursDonne(8, data);
            expect(api.patch).toHaveBeenCalledWith('/cours-donnes/8/', data);
        });

        it('deleteCoursDonne appelle DELETE /cours-donnes/:id/', () => {
            deleteCoursDonne(8);
            expect(api.delete).toHaveBeenCalledWith('/cours-donnes/8/');
        });
    });
});