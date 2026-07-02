import { Router } from 'express';
import multer from 'multer';
import * as userController from '../controllers/userControllers.js';
import { authenticateToken } from '../middlewares/auth.js';

const router: Router = Router();
const upload = multer();

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);

router.post(
  '/',
  authenticateToken,
  upload.none(),
  userController.createUser
);

router.put(
  '/:id',
  authenticateToken,
  upload.none(),
  userController.updateUser
);

router.delete(
  '/:id',
  authenticateToken,
  upload.none(),
  userController.deleteUser
);

export default router;