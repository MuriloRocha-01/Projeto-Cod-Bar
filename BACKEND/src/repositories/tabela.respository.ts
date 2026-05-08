import sql from "mssql";
import { poolPromise } from "../config/database.js";

export class TabelaRepository {
  async getTabela(numpcf: number) {
    const pool = await poolPromise;

    if (!pool) {
      throw new Error("❌ Conexão com o banco de dados não estabelecida");
    }

    const result = await pool.request().input("numpcf", sql.Int, numpcf)
      .query(`SELECT DISTINCT
                c.numpcf,
                c.posicao,
                c.situac,
                FORMAT(c.dathor_ini, 'dd/MM/yyyy') AS data,
                FORMAT(c.dathor_ini, 'HH:mm') AS hora,
                CONVERT(varchar, DATEADD(ms, DATEDIFF(ms, c.dathor_ini, ISNULL(c.dathor_fim, GETDATE())), 0), 108) AS duracao,
                e.descri, 
                op.operador 
            FROM controle_pcf c 
            JOIN cadpcf_etapas ce 
                ON c.numpcf = ce.numpcf AND c.posicao = ce.posicao
            JOIN etapas e
                ON e.codigo = ce.etapa
            LEFT OUTER JOIN tempo_pcf op 
                ON c.numpcf = op.numpcf AND c.posicao = op.posicao
            WHERE c.numpcf = @numpcf`
          );
    return result.recordset;
  }


  async getNomeProduto(numpcf: number) {
    const pool = await poolPromise;
    if (!pool) {
      throw new Error("❌ Conexão com o banco de dados não estabelecida");
    }

    const result = await pool.request().input("numpcf", sql.Int, numpcf)
      .query(`SELECT cadpro.nompro from cadpcf
            LEFT OUTER JOIN cadpro on cadpro.codpro = cadpcf.codpro
            WHERE cadpcf.numpcf = @numpcf`
          );
    return result.recordset[0];
  }

}
