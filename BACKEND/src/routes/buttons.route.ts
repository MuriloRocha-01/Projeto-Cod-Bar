import { ButtonController } from "../controllers/button.controller.js";
import { Router } from "express";

const router = Router();
const buttonController = new ButtonController();

router.post('/iniciar', (req, res) => buttonController.postIniciar(req, res));

router.post('/finalizar', (req, res) =>  buttonController.postFinalizar(req,res));

router.post('/pausar', (req, res) =>  buttonController.postPausar(req,res));

router.post('/retomar', (req,res)=> buttonController.postRetomarTabela(req,res));

router.post('/pularEtapa', (req,res)=> buttonController.postpularEtapa(req,res));

export default router;