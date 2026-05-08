// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // 1. Importe o dotenv
import Operadorrouter from './routes/operador.route.js';
import CodBarrouter from './routes/codbar.route.js';
import Tabelarouter from './routes/tabela.route.js';

const app = express();

dotenv.config(); 

// Middlewares essenciais
app.use(cors()); // Permite que o React (geralmente porta 5173) fale com o Node (3000)
app.use(express.json()); // Habilita o recebimento de JSON no body das requisições

const PORT = process.env.API_PORT || 3000;

app.use('/operador', Operadorrouter);

app.use('/codbar', CodBarrouter);

app.use('/tabela', Tabelarouter);

app.use((req,res) =>{
    res.status(404).json({
        message: "Rota não encontrada"
    });
})

app.listen(PORT, () => {
    console.log(`✅ Back-end conectado ao SQL rodando na porta ${PORT}`);
});


export default app;