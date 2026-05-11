import { api } from '../config/api';

export const useChangeEtapa = () => {
  const postIniciar = async (numpcf: number, posicao: number, operador: string, cadmot:number) => {
    try {
      const response = await api.post('/button/Iniciar', { params: { numpcf, posicao, operador, cadmot:0 } });
      return response.data;
    } catch (error) {
      console.error('Erro ao Iniciar :', error);
      throw error;
    }
  };


  const postPausar = async(numpcf: number, posicao: number, operador: string, cadmot:number)=>{
    try{
        const response = await api.post('/button/Pausar', { params: { numpcf, posicao,operador, cadmot } });
        return response.data;
    }catch(error:any){
        console.error('Erro ao Iniciar :', error);
        throw error;
    }
  };


  const postFinalizar = async (numpcf: number, posicao: number, operador: string, cadmot:number) => {
    try {
      const response = await api.post('/button/Finalizar', { params: { numpcf, posicao,operador, cadmot:0 } });
      return response.data;
    } catch (error) {
      console.error('Erro ao Finalizar :', error);
      throw error;
    }
  };

  const postRetomar = async (numpcf:number, posicao:number, operador:string, cadmot:number) => {
    try {
      const response = await api.post('/button/Retomar', { params: { numpcf, posicao, operador, cadmot:0 } });
      return response.data;
    } catch (error) {
      console.error('Erro ao Retomar:', error);
      throw error;
    }
  };

  const postPularEtapa = async (numpcf:number, posicao:number, operador:string, cadmot:number) => {
    try {
      const response = await api.post('/button/PularEtapa', { params: { numpcf, posicao, operador, cadmot:0 } });
      return response.data;
    } catch (error) {
      console.error('Erro ao Retomar:', error);
      throw error;
    }
  };
  return { postIniciar, postPausar, postFinalizar, postRetomar, postPularEtapa };
};
