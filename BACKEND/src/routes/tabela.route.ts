import { TabelaController } from "../controllers/tabela.controller.js";
import { Router } from "express";

const router = Router();
const tabelaController = new TabelaController();


router.get('/', (req, res) => tabelaController.getTabela(req, res));

router.get('/produto', (req, res) => tabelaController.getNomeProduto(req,res));

export default router;