// src/data/sliderData.ts

export interface ItemTabela {
  numpcf: number;
  posicao: number;
  situac: string;
  data: string;
  hora: string;
  duracao: number;
  descri: string;
  operador: string | null;
}

// 1. Use 'let' para permitir que a função setSliderData troque o valor
// 2. Mantenha o nome InfoTabela como você deseja
export let InfoTabela: ItemTabela[] = [];

export const setSliderData = (novosDados: ItemTabela[]) => {
  InfoTabela = novosDados;
};