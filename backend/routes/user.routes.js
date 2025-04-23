import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";
import { body } from "express-validator";
const router=Router();
router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid address'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 character'),
    userController.createUserController
);
router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid address'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 chracter'),
    userController.loginUserController
)
router.get('/profile',authMiddleware.authUser,userController.profileController);
router.get('/all',authMiddleware.authUser,userController.getAllUsersController);
router.get('/logout',authMiddleware.authUser,userController.logoutController);
export default router;
