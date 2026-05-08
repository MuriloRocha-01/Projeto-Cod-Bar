import { OperadorRepository } from "../repositories/operador.repository.js";

export class OperadorService {
  private repository = new OperadorRepository();

  async getOperador(senhaInformada: any) {
    const operador = await this.repository.getOperador(senhaInformada);

    if (!operador) {
      throw new Error("Operador não encontrado");
    }
    return operador;
  }
}
