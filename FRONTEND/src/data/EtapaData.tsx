// src/data/sliderData.ts

export interface ItemEtapa {
  numpcf: number;
  posicao: number;
  duracao: number;
  descri: string;
  etapa:number;
  idVirtual?: string; // Adicione este campo opcional
}

export let InfoEtapa: ItemEtapa[] = [];

export const setEtapaData = (novosDados: ItemEtapa[]) => {
  InfoEtapa = novosDados;
};