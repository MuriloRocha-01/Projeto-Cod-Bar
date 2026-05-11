import { ButtonRepository } from "../repositories/button.repository.js";

export class ButtonService {
  private repository = new ButtonRepository();

  async postIniciar(numpcf: number, posicao: number, operador:string, cadmot:number) {
    const sucesso = await this.repository.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot = 0
    );
    return { success: true, message: "Produção iniciada!" };
  }

  async postPausar(numpcf:number,posicao:number,operador:string,cadmot:number){
      const Pausar = await this.repository.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot
    );
    if (!Pausar) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa finalizada com sucesso" };
  }

  async postFinalizar(numpcf: number, posicao: number, operador:string, cadmot:number) {
    const Finalizar = await this.repository.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot
    );
    if (!Finalizar) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa finalizada com sucesso" };
  }
  async postRetomar(numpcf: number, posicao: number, operador:string, cadmot:number){
    const Finalizar = await this.repository.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot
    );
    if (!Finalizar) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa finalizada com sucesso" };
  }

  async postPularEtapa(numpcf: number, posicao: number, operador:string, cadmot:number){
     const PularEtapa = await this.repository.postPularEtapa(
      numpcf,
      posicao,
      operador,
      cadmot
    );
    if (!PularEtapa) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa finalizada com sucesso" };
  }
}
