import { ButtonRepository } from "../repositories/button.repository.js";

export class ButtonService {
  private repository = new ButtonRepository();

  async postIniciar(numpcf: number, posicao: number, data_agora: string) {
    if (!numpcf || !posicao) throw new Error("Dados inválidos para iniciar");

    const sucesso = await this.repository.postIniciar(
      numpcf,
      posicao,
      data_agora,
    );
    return { success: true, message: "Etapa iniciada com sucesso" };
  }

  async postFinalizar(numpcf: number, posicao: number, data_agora: string) {
    if (!numpcf || !posicao) throw new Error("Dados inválidos para finalizar");

    const Finalizar = await this.repository.postFinalizar(
      numpcf,
      posicao,
      data_agora,
    );

    return { success: true, message: "Etapa finalizada com sucesso" };
  }
}
