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
        const nomeProduto = await this.repository.getNomeProduto(numpcf)

        if(!nomeProduto){
            throw new Error('NomeProduto não encontrada')

        }
        return nomeProduto
    }   
    async getTabelaEtapa(numpcf:number){
        const tabelaEtapa = await this.repository.getTabelaEtapa(numpcf)

        if(!tabelaEtapa){
            throw new Error('Tabela Etapa não encontrada')

        }
        return tabelaEtapa 
    }


}