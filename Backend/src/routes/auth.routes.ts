import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validationLogin } from '../middleware/validationLogin.middleware';
import { validationLogout } from '../middleware/validationLogout.middleware';

const router = Router();

//* Autenticação
router.post('/login', validationLogin, AuthController.loginUser);
router.post('/logout', validationLogout, AuthController.logoutUser);

export default router;