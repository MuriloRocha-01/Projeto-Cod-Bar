import { ButtonController } from "../controllers/button.controller.js";
import { Router } from "express";

const router = Router();
const buttonController = new ButtonController();

router.post('/Inciar', (req, res) => buttonController.postIniciar(req, res));

router.post('/Finalizar', (req, res) =>  buttonController.postFinalizar(req,res));

router.post('/Pausar', (req, res) =>  buttonController.postPausar(req,res));

router.post('/Retomar', (req,res)=> buttonController.postRetomarTabela(req,res));

router.post('/PularEtapa', (req,res)=>buttonController.postRetomarTabela(req,res))

export default router;