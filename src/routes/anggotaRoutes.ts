import { Router } from 'express';
import multer from 'multer';
import * as anggotaController from '../controllers/anggotaController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router: Router = Router();
const upload = multer();

router.get('/', anggotaController.getAll);
router.get('/:id', anggotaController.getById);

router.post(
  '/',
  authenticateToken,
  upload.none(),
  anggotaController.create
);

router.put(
  '/:id',
  authenticateToken,
  upload.none(),
  anggotaController.update
);

router.delete(
  '/:id',
  authenticateToken,
  anggotaController.remove
);

export default router;