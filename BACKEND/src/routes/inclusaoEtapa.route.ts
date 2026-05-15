// rotas.js
import { Router } from "express";
import { InclusaoEtapaController } from "../controllers/inclusaoEtapa.controller.js";

const router = Router();
const controller = new InclusaoEtapaController();

// Chamamos o método do controller que sabe lidar com req e res
router.post('/', (req, res) => controller.postInclusaoEtapa(req, res));

export default router;