import type { Request, Response } from "express";
import { OperadorService } from "../services/operador.service.js";

export class OperadorController {
  async getOperadorSenha(req: Request, res: Response) {
    try {
      const senhaInformada = req.query.senha as string;

      const operadorService = new OperadorService();
      const resultado = await operadorService.getOperador(senhaInformada);
      
      if (!resultado) {
        res.status(404).json({
          message: "Nenhum operador encontrado",
        });
      }
      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao buscar operador",
        details: error.message,
      });
    }
  }
}
