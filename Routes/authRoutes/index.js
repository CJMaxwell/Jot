import { Router } from 'express';
import AuthController from '../../controllers/AuthController';


const authRoutes = Router();

authRoutes.post('/auth/signup', AuthController.signup);
authRoutes.post('/auth/login', AuthController.login);
authRoutes.put('/users/:id', AuthController.updateUser);
authRoutes.delete('/users/:id', AuthController.deleteUser);

export default authRoutes;