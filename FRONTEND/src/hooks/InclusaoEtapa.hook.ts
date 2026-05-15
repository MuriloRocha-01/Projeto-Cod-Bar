import {api} from "../config/api";

export const useInclusaoEtapa = () => {
    const postInclusaoEtapa  = async (numpcf:number, etapa:string, dimens:string, caract:string, durac:number) => {
        try {
            const response = await api.post('/inclusaoEtapa', { params: { numpcf, etapa, dimens, caract, durac} });
            return response.data;
        }catch (error) {
            console.error('Erro ao inserir nova etapa:', error);
            throw error;
        }

};
    return { postInclusaoEtapa };
}