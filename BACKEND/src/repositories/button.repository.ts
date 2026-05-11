import sql from "mssql";
import { poolPromise } from "../config/database.js";

export class ButtonRepository {
  // Inicia a etapa (como você já estava fazendo, mas com UPDATE se já existir)
  // ButtonRepository.ts
  async postAtualizaTabela(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
  ) {
    const pool = await poolPromise;

    const infoEtapa = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, posicao)
      .input("operador", sql.VarChar, operador)

      .query(
        `SELECT etapa FROM cadpcf_ETAPAS WHERE numpcf = @numpcf AND posicao = @posicao`,
      );
    const codigoEtapa = infoEtapa.recordset[0]?.etapa;

    const result = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, posicao)
      .input("operador", sql.VarChar, operador)
      .input("cadmot", sql.Int, cadmot || 0) // Se vier null/undefined, vira 0
      .input("etapa", sql.Int, codigoEtapa).query(`
        DECLARE @prox_sequen INT;
        DECLARE 

        IF NOT EXISTS (SELECT 1 FROM controle_pcf WHERE numpcf = @numpcf AND posicao = @posicao)
        BEGIN
          INSERT INTO controle_pcf (numpcf, posicao, dathor_ini, situac)
          VALUES (@numpcf, @posicao, GETDATE(), 'EM PRODUÇÃO');
        END
        ELSE
        BEGIN
          UPDATE controle_pcf 
          SET situac = 'EM PRODUÇÃO', dathor_ini = GETDATE()
          WHERE numpcf = @numpcf AND posicao = @posicao;
        END
        )
        SELECT @prox_sequen = ISNULL(MAX(sequen), 0) + 1 
        FROM tempo_pcf 
        WHERE numpcf = @numpcf AND posicao = @posicao;

        INSERT INTO tempo_pcf (numpcf, posicao, sequen, etapa, situac, inicio, fim, operador, codmot)
        VALUES (@numpcf, @posicao, @prox_sequen, @etapa, 'INICIADA', GETDATE(), GETDATE(), @operador, @cadmot);
      `);

    return result.rowsAffected.length > 0;
  }
  async postRetomar(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
  ) {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, posicao)
      .input("operador", sql.VarChar, operador)

      .query(
        `SELECT etapa FROM cadpcf_ETAPAS WHERE numpcf = @numpcf AND posicao = @posicao`,
      );
  }

  async postPularEtapa(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
  ) {
    const pool = await poolPromise; // Recomendado para garantir consistência

    try {
      // 1. Descobrir qual a última posição dessa PCF
      const ultimaPosResult = await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .query(
          "SELECT MAX(posicao) as ultimaPosicao FROM cadpcf_etapas WHERE numpcf = @numpcf",
        );

      const ultimaPosicao = ultimaPosResult.recordset[0].ultimaPosicao;

      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .input("operador", sql.VarChar, operador).query(`
                INSERT INTO tempo_pcf (numpcf, posicao, sequen, situac, inicio, fim, operador, codmot)
                VALUES (@numpcf, @posicao, 1, 'PULADA', GETDATE(), GETDATE(), @operador, 0)
            `);

      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .query(
          "UPDATE controle_pcf SET situac = 'PULADA' WHERE numpcf = @numpcf AND posicao = @posicao",
        );

      if (posicao === ultimaPosicao) {
        await pool
          .request()
          .input("numpcf", sql.Int, numpcf)
          .query(
            "UPDATE pedpro SET situac = 'FINALIZADA' WHERE numpcf = @numpcf",
          );
      } else {
        const proximaPosResult = await pool
          .request()
          .input("numpcf", sql.Int, numpcf)
          .input("posicao", sql.Int, posicao)
          .query(
            "SELECT MIN(posicao) as proxima FROM cadpcf_etapas WHERE numpcf = @numpcf AND posicao > @posicao",
          );

        const proximaPosicao = proximaPosResult.recordset[0].proxima;

        if (proximaPosicao) {
          await pool
            .request()
            .input("numpcf", sql.Int, numpcf)
            .input("proxima", sql.Int, proximaPosicao).query(`
                        INSERT INTO controle_pcf (numpcf, posicao, dathor_ini, dathor_fim, situac)
                        VALUES (@numpcf, @proxima, NULL, NULL, 'NÃO INICIADA')
                    `);
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Erro na transação de Pular Etapa:", error);
      throw error;
    }
  }
}
