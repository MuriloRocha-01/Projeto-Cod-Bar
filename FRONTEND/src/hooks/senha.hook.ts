import {api} from '../config/api';

export const useSenha = () => {
    const getOperador = async (senha: string) => {
        try {
            const response = await api.get('/operador', { params: { senha } });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter operador:', error);
            throw error;
        }
    };



    return { getOperador };
}