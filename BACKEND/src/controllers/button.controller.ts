import type { Response, Request } from "express";
import { ButtonService } from "../services/button.service.js";

export class ButtonController {
  async postIniciar(req: Request, res: Response) {
    try {
      const numpcf = Number(req.query.numpcf);
      const posicao = Number(req.query.posicao);
      const operador = String(req.query.operador).toUpperCase();
      const cadmot = Number(req.query.cadmot);

      const codBarService = new ButtonService();
      const resultado = await codBarService.postIniciar(
        numpcf,
        posicao,
        operador,
        cadmot,
      );

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

  async postPausar(req: Request, res: Response) {
    try {
      const numpcf = Number(req.query.numpcf);
      const posicao = Number(req.query.posicao);
      const operador = String(req.query.operador).toUpperCase();
      const cadmot = Number(req.query.cadmot);

      const buttonSerive = new ButtonService();
      const resultado = await buttonSerive.postPausar(
        numpcf,
        posicao,
        operador,
        cadmot,
      );

      if (!resultado) {
        res.status(404).json({
          message: "Nenhuma resposta ao Pausar",
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

  async postFinalizar(req: Request, res: Response) {
    try {
      const numpcf = Number(req.query.numpcf);
      const posicao = Number(req.query.posicao);
      const operador = String(req.query.operador).toUpperCase();
      const cadmot = Number(req.query.cadmot);

      const buttonSerive = new ButtonService();
      const resultado = await buttonSerive.postFinalizar(
        numpcf,
        posicao,
        operador,
        cadmot,
      );

      if (!resultado) {
        res.status(404).json({
          message: "Nenhuma resposta ao Pausar",
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

  async postRetomarTabela(req:Request, res:Response){
    try {
      const numpcf = Number(req.query.numpcf);
      const posicao = Number(req.query.posicao);
      const operador = String(req.query.operador).toUpperCase();
      const cadmot = Number(req.query.cadmot);

      const buttonSerive = new ButtonService();
      const resultado = await buttonSerive.postRetomar(
        numpcf,
        posicao,
        operador,
        cadmot,
      );

      if (!resultado) {
        res.status(404).json({
          message: "Nenhuma resposta ao Pausar",
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
}
