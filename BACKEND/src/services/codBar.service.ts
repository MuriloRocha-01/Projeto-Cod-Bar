import { CodBarRepository } from "../repositories/codBar.repository.js";

export class CodBarService {
  private repository = new CodBarRepository();

  async getCodBar(codebar: any) {
    const codBar = await this.repository.getCodBar(codebar);

    if (!codBar) {
      throw new Error("Código de barras não encontrado");
    }

    return codBar;
  }
}
