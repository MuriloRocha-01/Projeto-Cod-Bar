import { CodBarController } from "../controllers/codBar.controller.js";
import { Router } from "express";

const router = Router();
const codBarController = new CodBarController();

//rota para buscar o código de barras
router.get('/', (req, res) => codBarController.getCodBar(req, res));

export default router;