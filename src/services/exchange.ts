
// import api 
import api from "./api";

interface ExchangeResponse {
  result: number;
  query: {
    from: string;
    to: string;
    amount: number;
  };
}

export const getEchangeRate = async (from: string, to: string, amount: number) => {
  try {
    const response = await api.get<ExchangeResponse>('convert', {
      params: { from, to, amount }
    });
    console.log(response);

    const result = response.data.result;
    if (result === undefined || result === null) {
      throw new Error('Valor de conversão não encontrado');
    }

    return result;

  } catch (error) {
    console.error('Erro ao obter taxa de câmbio:', error);
    return 0; 
  }
}   
