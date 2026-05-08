import sql from "mssql";
import { poolPromise } from "../config/database.js";

export class CodBarRepository {
  async getCodBar(codebar: any) {
    const pool = await poolPromise;
    if (!pool) {
      throw new Error("❌ Conexão com o banco de dados não estabelecida");
    }

    const numpcfRaw = codebar.substring(0, 9); 
    const posicaoRaw = codebar.substring(9, 11);

    const numpcf = Number(numpcfRaw);
    const posicao = Number(posicaoRaw);

    const result = await pool.request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, posicao).query(`
                SELECT numpcf from cadpcf_etapas
                WHERE cadpcf_etapas.numpcf = @numpcf
                AND cadpcf_etapas.posicao = @posicao`
                
            );

    return result.recordset[0];
  }
}
