import type { Request, Response } from "express";
import { InclusaoEtapa } from "../services/inclusaoEtapa.service.js";

export class InclusaoEtapaController {
  async postInclusaoEtapa(req: Request, res: Response) {
    try {
      // Extraímos os campos corretos do corpo da requisição (body)
      const { numpcf, etapa, dimens, caract, duracao } = req.body;

      const inclusaoEtapaService = new InclusaoEtapa();
      
      const resultado = await inclusaoEtapaService.postinclusaoEtapa(
        Number(numpcf),
        String(etapa),
        String(dimens),
        String(caract),
        Number(duracao)
      );
      
      return res.status(201).json(resultado);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({
        message: "Erro ao incluir etapa",
        details: error.message,
      });
    }
  }
}