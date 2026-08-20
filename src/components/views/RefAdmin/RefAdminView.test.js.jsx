
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefadminView } from './RefadminView';
import * as refadminService from '../../../services/refAdminService/refadminService.js';


vi.mock('../../modals/RefAdmin/FiliereModal', () => ({
    FiliereModal: ({ isOpen }) => (isOpen ? <div data-testid="filiere-modal" /> : null),
}));
vi.mock('../../modals/RefAdmin/CursusModal', () => ({
    CursusModal: () => null,
}));
vi.mock('../../modals/RefAdmin/PromoModal', () => ({
    PromoModal: () => null,
}));
vi.mock('../../modals/RefAdmin/CoursDonneModal', () => ({
    CoursDonneModal: () => null,
}));
vi.mock('./PlanningView', () => ({
    PlanningView: () => <div data-testid="planning-view" />,
}));

vi.mock('../../../services/refadminService.js');

const mockData = {
    filieres: [{ id: 1, code: 'DEV', nom: 'Développement' }],
    cursus: [],
    promotions: [
        { id: 1, nom: 'Promo A', filiere: { id: 1, nom: 'Développement' }, date_debut: '2020-01-01', date_fin: '2020-06-01' },
    ],
    eleves: [],
    formateurs: [],
    coursDonnes: [],
};

function mockLoadAllSuccess() {
    refadminService.getFilieres.mockResolvedValue({ data: mockData.filieres });
    refadminService.getCursusList.mockResolvedValue({ data: mockData.cursus });
    refadminService.getPromotions.mockResolvedValue({ data: mockData.promotions });
    refadminService.getEleves.mockResolvedValue({ data: mockData.eleves });
    refadminService.getFormateurs.mockResolvedValue({ data: mockData.formateurs });
    refadminService.getCoursDonnes.mockResolvedValue({ data: mockData.coursDonnes });
}

describe('RefadminView', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('affiche le loader pendant le chargement', () => {

        Object.values(refadminService).forEach((fn) => {
            if (typeof fn === 'function') fn.mockReturnValue(new Promise(() => {}));
        });

        render(<RefadminView />);
        expect(screen.getByText('Chargement...')).toBeInTheDocument();
    });

    it("affiche un message d'erreur si le chargement échoue", async () => {
        refadminService.getFilieres.mockRejectedValue(new Error('network error'));
        refadminService.getCursusList.mockResolvedValue({ data: [] });
        refadminService.getPromotions.mockResolvedValue({ data: [] });
        refadminService.getEleves.mockResolvedValue({ data: [] });
        refadminService.getFormateurs.mockResolvedValue({ data: [] });
        refadminService.getCoursDonnes.mockResolvedValue({ data: [] });

        render(<RefadminView />);

        expect(await screen.findByText(/Impossible de charger les données/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Réessayer' })).toBeInTheDocument();
    });

    it('affiche les filières une fois chargées', async () => {
        mockLoadAllSuccess();
        render(<RefadminView />);

        await waitFor(() => {
            expect(screen.getByText('Développement')).toBeInTheDocument();
        });
        expect(screen.getByText('DEV')).toBeInTheDocument();
    });

    it('change de tableau au clic sur un onglet', async () => {
        mockLoadAllSuccess();
        const user = userEvent.setup();
        render(<RefadminView />);

        await waitFor(() => expect(screen.getByText('Développement')).toBeInTheDocument());

        await user.click(screen.getByRole('button', { name: 'Promotions' }));

        expect(screen.getByText('Promo A')).toBeInTheDocument();
        expect(screen.getByText('En cours') || screen.getByText('Terminée')).toBeTruthy();
    });

    it('le bouton "+" est masqué sur l\'onglet Élèves', async () => {
        mockLoadAllSuccess();
        const user = userEvent.setup();
        render(<RefadminView />);

        await waitFor(() => expect(screen.getByText('Développement')).toBeInTheDocument());

        await user.click(screen.getByRole('button', { name: 'Élèves' }));

        expect(screen.queryByTitle('Ajouter une filière')).not.toBeInTheDocument();
    });

    it('ouvre le modal filière au clic sur "+"', async () => {
        mockLoadAllSuccess();
        const user = userEvent.setup();
        render(<RefadminView />);

        await waitFor(() => expect(screen.getByText('Développement')).toBeInTheDocument());

        await user.click(screen.getByTitle('Ajouter une filière'));

        expect(screen.getByTestId('filiere-modal')).toBeInTheDocument();
    });
});