import type { Request, Response } from "express";
import { TabelaService } from "../services/tabela.serive.js";

export class TabelaController {
    async getTabela(req: Request, res: Response) {
        try {
            const numpcf = Number(req.query.numpcf);

            const tabelaService = new TabelaService();
            const resultado = await tabelaService.getTabela(numpcf);
            if (!resultado) {
                res.status(404).json({
                    message: "Nenhuma tabela encontrada",
                });
            }
            return res.status(200).json(resultado);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar tabela",
                details: error.message,
            });
        }
    }
    async getNomeProduto(req:Request, res:Response){
        try{
            const numpcf = Number(req.query.numpcf)

            const tabelaService = new TabelaService();
            const resultado = await tabelaService.getNomeProduto(numpcf);
            if(!resultado){
                res.status(404).json({
                    message: "Nenhuma tabela encontrada",
                });
            }
        return res.status(200).json(resultado);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar tabela",
                details: error.message,
            });
        }
    }

    async getTabelaEtapa(req:Request, res:Response){
        try {
            const numpcf = Number(req.query.numpcf);

            const tabelaService = new TabelaService();
            const resultado = await tabelaService.getTabelaEtapa(numpcf);
            if (!resultado) {
                res.status(404).json({
                    message: "Nenhuma tabela encontrada",
                });
            }
            return res.status(200).json(resultado);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar tabela",
                details: error.message,
            });
        }
    }

}