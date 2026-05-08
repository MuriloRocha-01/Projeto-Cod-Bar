import { Router } from "express";
import { OperadorController } from "../controllers/operador.controller.js";

const router = Router();
const operadorController = new OperadorController();

//rota para verificar se a senha do operador é válida
router.get('/', (req, res) => operadorController.getOperadorSenha(req, res));

export default router;