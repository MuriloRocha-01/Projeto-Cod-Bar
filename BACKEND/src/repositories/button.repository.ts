import sql from "mssql";
import { poolPromise } from "../config/database.js";

export class ButtonRepository {
  async postAtualizaTabela(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
    situacTempo: string,
    situacControle: string,
    etapa: number,
  ) {
    const pool = await poolPromise;

    const resSequen = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, posicao)
      .query(
        `SELECT ISNULL(MAX(sequen), 0) as sequen FROM tempo_pcf WHERE numpcf = @numpcf AND posicao = @posicao`,
      );

    let sequenWs = resSequen.recordset[0].sequen;

    if (situacTempo !== "INICIADA" && sequenWs > 0) {
      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .input("sequen", sql.Int, sequenWs)
        .query(
          `UPDATE tempo_pcf SET fim = GETDATE() WHERE numpcf = @numpcf AND posicao = @posicao AND sequen = @sequen`,
        );
    }

    sequenWs++;

    if (situacTempo !== "FINALIZADA") {
      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .input("sequen", sql.Int, sequenWs)
        .input("etapa", sql.Int, etapa)
        .input("situac", sql.VarChar, situacTempo)
        .input("operador", sql.VarChar, operador)
        .input("codmot", sql.Int, cadmot)
        .query(`
            INSERT INTO tempo_pcf (numpcf, posicao, sequen, etapa, situac, inicio, operador, codmot)
            VALUES (@numpcf, @posicao, @sequen, @etapa, @situac, GETDATE(), @operador, @codmot)
          `);

      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .input("situacControle", sql.VarChar, situacControle)
        .query(
          `UPDATE controle_pcf SET dathor_ini = GETDATE(), situac = @situacControle WHERE numpcf = @numpcf AND posicao = @posicao`,
        );
    } else {
      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .input("sequen", sql.Int, sequenWs)
        .input("etapa", sql.Int, etapa)
        .input("situac", sql.VarChar, situacTempo)
        .input("operador", sql.VarChar, operador)
        .input("codmot", sql.Int, cadmot)
        .query(`
            INSERT INTO tempo_pcf (numpcf, posicao, sequen, etapa, situac, inicio, fim, operador, codmot)
            VALUES (@numpcf, @posicao, @sequen, @etapa, @situac, GETDATE(), GETDATE(), @operador, @codmot)
          `);

      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .input("situacControle", sql.VarChar, situacControle)
        .query(
          `UPDATE controle_pcf SET dathor_fim = GETDATE(), situac = @situacControle WHERE numpcf = @numpcf AND posicao = @posicao`,
        );
    }
  }

  async postIniciar(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
    etapa: number,
  ) {
    const pool = await poolPromise;

    const checkControle = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .input("posicao", sql.Int, posicao)
      .query(
        `SELECT situac FROM controle_pcf WHERE numpcf = @numpcf AND posicao = @posicao`,
      );

    if (checkControle.recordset.length === 0) {
      await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .query(`
          INSERT INTO controle_pcf (numpcf, posicao, dathor_ini, dathor_fim, situac)
          VALUES (@numpcf, @posicao, GETDATE(), NULL, 'NÃO INICIADA')
        `);
    }

    return this.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot,
      "INICIADA",
      "EM PRODUÇÃO",
      etapa,
    );
  }

  async postFinalizar(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
    etapa: number,
  ) {
    const pool = await poolPromise;

    const resUltima = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .query(
        `SELECT MAX(posicao) as ultimaPosicao FROM cadpcf_etapas WHERE numpcf = @numpcf`,
      );

    const ultimaPosicao = resUltima.recordset[0].ultimaPosicao;

    await this.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot,
      "FINALIZADA",
      "FINALIZADA",
      etapa,
    );

    if (posicao === ultimaPosicao) {
      await pool.request().input("numpcf", sql.Int, numpcf)
      .query(`
          UPDATE pedpro SET situac = 'FINALIZADA' WHERE numpcf = @numpcf;
          UPDATE cadpcf SET situac = 'FINALIZADA' WHERE numpcf = @numpcf;
        `);

      const resPedido = await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .query(`SELECT numped, sequen FROM cadpcf WHERE numpcf = @numpcf`);

      if (resPedido.recordset.length > 0) {
        const { numped, sequen } = resPedido.recordset[0];
        await pool
          .request()
          .input("numped", sql.Int, numped)
          .input("sequen", sql.Int, sequen)
          .query(
            `UPDATE cadped1 SET situac = 'AGUARDANDO FATURAMENTO' WHERE numped = @numped AND sequen = @sequen`,
          );
      }
    } else {
      const resProxima = await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .query(`
          SELECT TOP 1 posicao FROM cadpcf_etapas 
          WHERE numpcf = @numpcf AND posicao > @posicao 
          ORDER BY posicao ASC
        `);

      if (resProxima.recordset.length > 0) {
        const proximaPosicao = resProxima.recordset[0].posicao;

        await pool
          .request()
          .input("numpcf", sql.Int, numpcf)
          .input("proxima", sql.Int, proximaPosicao)
          .query(`
            IF NOT EXISTS (SELECT 1 FROM controle_pcf WHERE numpcf = @numpcf AND posicao = @proxima)
            BEGIN
              INSERT INTO controle_pcf (numpcf, posicao, dathor_ini, dathor_fim, situac)
              VALUES (@numpcf, @proxima, NULL, NULL, 'NÃO INICIADA')
            END
          `);
      }
    }
    return true;
  }

  async postPausar(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
    etapa: number,
  ) {
    const pool = await poolPromise;

    await this.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot,
      "PAUSADA",
      "PAUSADA",
      etapa,
    );
  return true;    
  }

  async postRetomar(
    numpcf: number,
    posicao: number,
    operador: string,
    cadmot: number,
    etapa: number,
  ) {
    const pool = await poolPromise;

    await this.postAtualizaTabela(
      numpcf,
      posicao,
      operador,
      cadmot,
      "RETOMADA",
      "EM PRODUÇÃO",
      etapa,
    );
    return true;
  }

  async postPularEtapa(
    numpcf: number,
    posicao: number,
    operador: string,
    etapa: number,
    cadmot: number,
  ) {
    const pool = await poolPromise;

    const resUltima = await pool
      .request()
      .input("numpcf", sql.Int, numpcf)
      .query(
        `SELECT MAX(posicao) as ultimaPosicao FROM cadpcf_etapas WHERE numpcf = @numpcf`,
      );

    const ultimaPosicao = resUltima.recordset[0].ultimaPosicao;

    if (posicao === ultimaPosicao) {
      await pool.request().input("numpcf", sql.Int, numpcf)
      .query(`
          UPDATE pedpro SET situac = 'FINALIZADA' WHERE numpcf = @numpcf;
        `);

      await this.postAtualizaTabela(
        numpcf,
        posicao,
        operador,
        cadmot,
        "PULADA",
        "PULADA",
        etapa,
      );
    } else {
      await this.postAtualizaTabela(
        numpcf,
        posicao,
        operador,
        cadmot,
        "FINALIZADA",
        "FINALIZADA",
        etapa,
      );

      await pool.request();
      const resProxima = await pool
        .request()
        .input("numpcf", sql.Int, numpcf)
        .input("posicao", sql.Int, posicao)
        .query(`
        SELECT TOP 1 posicao FROM cadpcf_etapas 
        WHERE numpcf = @numpcf AND posicao > @posicao 
        ORDER BY posicao ASC
      `);

      if (resProxima.recordset.length > 0) {
        const proximaPosicao = resProxima.recordset[0].posicao;

        // UPDATE controle_pcf da posição atual
        await pool
          .request()
          .input("numpcf", sql.Int, numpcf)
          .input("posicao", sql.Int, posicao)
          .query(
            `UPDATE controle_pcf SET situac = 'PULADA' WHERE numpcf = @numpcf AND posicao = @posicao`,
          );

        await pool
          .request()
          .input("numpcf", sql.Int, numpcf)
          .input("proxima", sql.Int, proximaPosicao)
          .query(`
            IF NOT EXISTS (SELECT 1 FROM controle_pcf WHERE numpcf = @numpcf AND posicao = @proxima)
            BEGIN
              INSERT INTO controle_pcf (numpcf, posicao, dathor_ini, dathor_fim, situac)
              VALUES (@numpcf, @proxima, NULL, NULL, 'NÃO INICIADA')
            END
          `);
      }
    }

    return true;
  }
}
