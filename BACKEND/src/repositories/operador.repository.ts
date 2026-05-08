import sql from 'mssql';
import { poolPromise } from '../config/database.js';

export class OperadorRepository {
    async getOperador(senha: number){
        const pool = await poolPromise;

        if(!pool){
            throw new Error('❌ Conexão com o banco de dados não estabelecida');
        }

        const result = await pool.request()
            .input('senhaFornecida', sql.VarChar, senha)
            .query(`SELECT operador
                FROM cad_operadores 
                WHERE senha = @senhaFornecida AND situac = 'ATIVO'
            `);

        return result.recordset[0];

    }
}