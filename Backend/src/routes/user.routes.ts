import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAdmin } from '../middleware/admin.middleware';
import { validationPostUser } from '../middleware/validationPostUser.middleware';
import { validationPutUser } from '../middleware/validationPutUser.middleware';

const router = Router();

//* Usuários
router.get('/', isAdmin, UserController.getAllUsers);
router.post('/', isAdmin, validationPostUser, UserController.createUser);
router.get('/:id', UserController.getUser);
router.put('/:id', isAdmin, validationPutUser, UserController.updateUser);
router.delete('/:id', isAdmin, UserController.deleteUser);

export default router;
