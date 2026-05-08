export interface IOperadorTabela {
    descri: string;    // Nome da etapa (Solda, Corte, etc)
    situac: string;    // 'F' para finalizada, 'A' para aberto
    operador: string | null;
    data: string;      // O SQL devolve como String formatada ou Date
    hora: string;      // O SQL devolve como String
    duracao: number;   // O resultado do DATEDIFF
}

export interface INomeProduto {
    nompro:string;
}