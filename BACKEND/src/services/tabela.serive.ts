import { TabelaRepository } from "../repositories/tabela.respository.js";

export class TabelaService {
    private repository = new TabelaRepository();

    async getTabela(numpcf:number){
        const tabela = await this.repository.getTabela(numpcf);

        if(!tabela){
            throw new Error('Tabela não encontrada');
        }
        return tabela;
    }

    async getNomeProduto(numpcf:number){
        const tabela = await this.repository.getNomeProduto(numpcf)

        if(!tabela){
            throw new Error('Tabela não encontrada')

        }
        return tabela 
    }   


}