import sql from "mssql";
import { poolPromise } from "../config/database.js";

export class TabelaRepository {
  async getTabela(numpcf: number) {
    const pool = await poolPromise;
    if (!pool) throw new Error("❌ Conexão não estabelecida");

    const result = await pool.request().input("numpcf", sql.Int, numpcf).query(`
      SELECT DISTINCT
        c.numpcf,
        c.posicao,
        c.situac, 
        FORMAT(c.dathor_ini, 'dd/MM/yyyy') AS data,
        FORMAT(c.dathor_ini, 'HH:mm') AS hora,
        CASE 
            WHEN c.dathor_ini IS NULL THEN '00:00:00'
            ELSE CONVERT(varchar, DATEADD(ss, DATEDIFF(ss, c.dathor_ini, ISNULL(c.dathor_fim, GETDATE())), 0), 108)
        END AS duracao,
        e.descri, 
        (SELECT TOP 1 operador FROM tempo_pcf 
         WHERE numpcf = c.numpcf AND posicao = c.posicao 
         ORDER BY sequen DESC) AS operador,
        ce.etapa
      FROM controle_pcf c 
      JOIN cadpcf_etapas ce ON c.numpcf = ce.numpcf AND c.posicao = ce.posicao
      JOIN etapas e ON e.codigo = ce.etapa
      WHERE c.numpcf = @numpcf
      ORDER BY c.posicao ASC
    `);

    // Importante: Se você quer listar as etapas em um Grid/Lista, use .recordset
    // Se for apenas para o cabeçalho de uma etapa específica, use .recordset[0]
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
            WHERE cadpcf.numpcf = @numpcf`);
    return result.recordset[0];
  }

  async getTabelaEtapa(numpcf: number) {
    const pool = await poolPromise;
    if (!pool) {
      throw new Error("❌ Conexão com o banco de dados não estabelecida");
    }

    const result = await pool.request().input("numpcf", sql.Int, numpcf)
      .query(`  select pcf.posicao, eta.descri, pcf.dimensionais, pcf.caracteristicas, pcf.tempo_etapa
                from cadpcf_etapas pcf
                left outer join etapas eta on pcf.etapa = eta.codigo
                where pcf.numpcf = @numpcf
                order by pcf.posicao`);

    return result.recordset;
  }
}
