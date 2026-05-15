import { InclusaoEtapaRepository } from "../repositories/inclusaoEtapa.js";

export class InclusaoEtapa {
  private repository = new InclusaoEtapaRepository();

  async postinclusaoEtapa(numpcf:number, etapa:string, dimens:string, caract:string, duracao:number) {
    const inclusaoEtapa = await this.repository.postInclusaoEtapa(numpcf, etapa, dimens, caract, duracao);  

    if (!inclusaoEtapa) {
      throw new Error("Dados enviados errado!");
    }
    return { success: true, message: "Etapa Incluida com sucesso!" };
  }
}
