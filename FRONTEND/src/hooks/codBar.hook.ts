import {api} from "../config/api";

export const useCodBar = () => {
    const getCodBar  = async (codebar: string) => {
        try {
            const response = await api.get('/codbar', { params: { codebar } });
            return response.data;
        }catch (error) {
            console.error('Erro ao obter o codigo de barras:', error);
            throw error;
        }

};
    return { getCodBar };
}