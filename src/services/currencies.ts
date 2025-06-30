import api from './api';

interface ListResponse {
    success: boolean;
    currencies: {
        [code: string]: string;
    };
}

export const getAvailableCurrencies = async () => {

    try {
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
        
    } catch (error) {
        console.error("Erro ao buscar a lista de moedas: ", error);
        
    }
}   