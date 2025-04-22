import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";
const router =Router();
router.post('/create',
    body('name').isString().withMessage('Name is required'),authMiddleware.authUser,
    projectController.createProject);

router.get('/all',authMiddleware.authUser,projectController.getAllProject)
export default router;