import type { Response, Request } from "express";
import { ButtonService } from "../services/button.service.js";

export class ButtonController {
  async postIniciar(req: Request, res: Response) {
    try {
      const { numpcf, posicao, operador, cadmot, etapa } = req.body;

      const numpcfNum = Number(numpcf);
      const posicaoNum = Number(posicao);
      const operadorStr = String(operador).toUpperCase();
      const cadmotNum = Number(cadmot || 0);
      const etapaNum = Number(etapa);

      const buttonService = new ButtonService();
      const resultado = await buttonService.postIniciar( numpcfNum, posicaoNum, operadorStr, cadmotNum, etapaNum );

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
      const { numpcf, posicao, operador, cadmot, etapa } = req.body;

      const numpcfNum = Number(numpcf);
      const posicaoNum = Number(posicao);
      const operadorStr = String(operador).toUpperCase();
      const cadmotNum = Number(cadmot);
      const etapaNum = Number(etapa)

      const buttonService = new ButtonService();
      const resultado = await buttonService.postPausar( numpcfNum, posicaoNum, operadorStr, cadmotNum, etapaNum );

      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao Pausar",
        details: error.message,
      });
    }
  }

  async postFinalizar(req: Request, res: Response) {
    try {
      const { numpcf, posicao, operador, cadmot, etapa } = req.body;

      const numpcfNum = Number(numpcf);
      const posicaoNum = Number(posicao);
      const operadorStr = String(operador).toUpperCase();
      const cadmotNum = Number(cadmot || 0);
      const etapaNum = Number(etapa);

      const buttonService = new ButtonService();
      const resultado = await buttonService.postFinalizar( numpcfNum, posicaoNum, operadorStr, cadmotNum, etapaNum );

      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao Finalizar",
        details: error.message,
      });
    }
  }

  async postRetomarTabela(req: Request, res: Response) {
    try {
      const { numpcf, posicao, operador, cadmot, etapa } = req.body;

      const numpcfNum = Number(numpcf);
      const posicaoNum = Number(posicao);
      const operadorStr = String(operador).toUpperCase();
      const cadmotNum = Number(cadmot || 0);
      const etapaNum = Number(etapa);

      const buttonService = new ButtonService();
      const resultado = await buttonService.postIniciar(numpcfNum, posicaoNum ,operadorStr ,cadmotNum ,etapaNum );

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

  async postpularEtapa(req: Request, res: Response) {
    try {
      const { numpcf, posicao, operador, etapa, cadmot } = req.body;

      const numpcfNum = Number(numpcf);
      const posicaoNum = Number(posicao);
      const operadorStr = String(operador).toUpperCase();
      const etapaNum = Number(etapa);
      const cadmotNum = Number(cadmot || 0);

      const buttonService = new ButtonService();
      const resultado = await buttonService.postPularEtapa(numpcfNum ,posicaoNum ,operadorStr, etapaNum, cadmotNum );

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
