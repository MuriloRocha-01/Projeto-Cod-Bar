import { ButtonRepository } from "../repositories/button.repository.js";

export class ButtonService {
  private repository = new ButtonRepository();

  async postIniciar(numpcf:number, posicao:number, operador:string, cadmot:number, etapa:number) {
    const sucesso = await this.repository.postIniciar(
      numpcf,
      posicao,
      operador,
      cadmot,
      etapa
    );
    return { success: true, message: "Produção iniciada!" };
  }

  async postPausar(numpcf:number, posicao:number, operador:string, cadmot:number, etapa:number){
      const Pausar = await this.repository.postPausar(
      numpcf,
      posicao,
      operador,
      cadmot,
      etapa
    );
    if (!Pausar) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa Pausada com sucesso" };
  }

  async postFinalizar(numpcf:number, posicao:number, operador:string, cadmot:number, etapa:number) {
    const Finalizar = await this.repository.postFinalizar(
      numpcf,
      posicao,
      operador,
      cadmot,
      etapa
    );
    if (!Finalizar) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa finalizada com sucesso" };
  }
  
  async postRetomar(numpcf:number, posicao:number, operador:string, cadmot:number, etapa:number){
    const Retomar = await this.repository.postRetomar(
      numpcf,
      posicao,
      operador,
      cadmot,
      etapa
    );
    if (!Retomar) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa finalizada com sucesso" };
  }

  async postPularEtapa(numpcf: number, posicao: number, operador: string, etapa:number, cadmot:number){
     const PularEtapa = await this.repository.postPularEtapa(
      numpcf,
      posicao,
      operador,
      etapa, 
      cadmot
    );
    if (!PularEtapa) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa Pulada com sucesso!" };
  }
}
