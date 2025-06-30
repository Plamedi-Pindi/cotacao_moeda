import api from './api';

interface ListResponse {
    success: boolean;
    currencies: {
        [code: string]: string;
    };
}

export const getAvailableCurrencies = async (): Promise<{ code: string; name: string }[]> => {
    const response = await api.get<ListResponse>('list');

    const { success, currencies } = response.data;

    if (!success || !currencies) {
        console.warn('Resposta inesperada ao buscar moedas:', response.data);
        return [];
    }

    return Object.entries(currencies).map(([code, name]) => ({
        code,
        name,
    }));
}   