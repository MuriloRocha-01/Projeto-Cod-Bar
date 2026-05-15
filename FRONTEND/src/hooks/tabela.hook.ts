import { api } from "../config/api";

export const useTabela = () => {
    // Função para buscar a lista de etapas da PCF
    const getTabela = async (numpcf: number) => {
        try {
            const response = await api.get('/tabela', { params: { numpcf } });
            return response.data;
        }    
        catch (error) {
            console.error('Erro ao obter tabela:', error);
            throw error;
        }
    };

    // Função para buscar o nome do produto vinculado à PCF
    const getNome = async (numpcf: number) => {
        try {
            // Chamada para a nova rota configurada no Express
            const response = await api.get('/tabela/produto', { params: { numpcf } });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter nome do produto:', error);
            throw error;
        }
    };

    const getabelaEtapa = async (numpcf: number) => {
        try {
            const response = await api.get('/tabela/etapa', { params: { numpcf } });
            return response.data;
        }    
        catch (error) {
            console.error('Erro ao obter tabelaEtapa:', error);
            throw error;
        }
    };

    
    return { getTabela, getNome, getabelaEtapa };
};