import type { Response, Request } from "express";
import { ButtonService } from "../services/button.service.js"

export class ButtonController {
    async postInciar(req:Request, res:Response){
        try {
              const numpcf = Number(req.query.numpcf);
              const posicao = Number(req.query.posicao);
              const data_agora = String(req.query.data_agora)
        
              const codBarService = new ButtonService();
              const resultado = await codBarService.postIniciar(numpcf, posicao, data_agora);
              
              if (!resultado) {
                res.status(404).json({
                  message: "Nenhuma resposta ao iniciar",
                });
              }
              return res.status(200).json(resultado);
            } catch (error: any) {
              console.error(error);
              return res.status(500).json({
                message: "Erro ao iniciar",
                details: error.message,
              });
            }
    }

    async postFinalizar(){

    }

}