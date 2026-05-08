import sql from "mssql";
import { poolPromise } from "../config/database.js";

export class ButtonRepository {
  // Inicia a etapa (como você já estava fazendo, mas com UPDATE se já existir)
  async postIniciar(numpcf: number, posicao: number, data_agora: string) {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, posicao)
      .input("data_agora", sql.VarChar, data_agora).query(`
            UPDATE controle_pcf 
            SET situac = 'EM PRODUÇÃO', dathor_ini = @data_agora 
            WHERE numpcf = @numpcf AND posicao = @posicao;`);

    return result.recordset[0];
  }

  async postPausar() {}
  async postFinalizar(numpcf: number, posicao: number, data_agora: string) {
    const pool = await poolPromise;
  }
}
