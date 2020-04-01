import { Router } from 'express';
import AuthController from '../../controllers/AuthController';


const authRoutes = Router();

authRoutes.post('/auth/signup', AuthController.signup);
authRoutes.post('/auth/login', AuthController.login);

export default authRoutes;