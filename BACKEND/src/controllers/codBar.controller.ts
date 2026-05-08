import type { Request, Response } from "express";
import { CodBarService } from "../services/codBar.service.js";

export class CodBarController {
  async getCodBar(req: Request, res: Response) {
    try {
      const codBarInformado = req.query.codebar as string;

      const codBarService = new CodBarService();
      const resultado = await codBarService.getCodBar(codBarInformado);
      
      if (!resultado) {
        res.status(404).json({
          message: "Nenhum código de barras encontrado",
        });
      }
      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao buscar código de barras",
        details: error.message,
      });
    }
  }
}
