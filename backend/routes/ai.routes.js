import { Router } from "express";
import * as AiController from "../controllers/ai.controller.js"
const router= Router();

router.get('/get-result',AiController.getResult)
export default router;