import sql from "mssql";
import { poolPromise } from "../config/database.js";

export class InclusaoEtapaRepository {
  async postInclusaoEtapa(numpcf: number, etapa: string, dimens: string, caract: string, duracao: number) {
    const pool = await poolPromise;

    if (!pool) throw new Error("❌ Conexão com o banco de dados não estabelecida");

    const resultEtapa = await pool.request()
        .input("etapa", sql.VarChar, etapa)
        .query(`SELECT codigo FROM etapas WHERE descri = @etapa`);
    if (resultEtapa.recordset.length === 0) throw new Error("Etapa não encontrada no cadastro");
    const codEtapaReal = resultEtapa.recordset[0].codigo;

    const resultPosicao = await pool.request()
        .input("numpcf", sql.Int, numpcf)
        .query(`SELECT ISNULL(MAX(posicao), 0) as ultima FROM cadpcf_etapas WHERE numpcf = @numpcf`);
    
    const proximaPosicao = resultPosicao.recordset[0].ultima + 1;

    await pool.request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, proximaPosicao)
      .input("codeta", sql.Int, codEtapaReal)
      .input("dimens", sql.VarChar, dimens)
      .input("caract", sql.VarChar, caract)
      .input("tempo_etapa", sql.Int, duracao)
      .query(`
        INSERT INTO cadpcf_etapas (numpcf, posicao, etapa, dimens, caract, tempo_etapa) 
        VALUES (@numpcf, @posicao, @codeta, @dimens, @caract, @tempo_etapa)
      `);

    return { 
      success: true
    };
  }
}