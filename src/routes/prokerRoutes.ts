import { Router } from 'express';
import multer from 'multer';
import * as prokerController from '../controllers/prokerController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router: Router = Router();
const upload = multer();

router.get('/', prokerController.getAll);
router.get('/:id', prokerController.getById);

router.post(
  '/',
  authenticateToken,
  upload.none(),
  prokerController.create
);

router.put(
  '/:id',
  authenticateToken,
  upload.none(),
  prokerController.update
);

router.delete(
  '/:id',
  authenticateToken,
  prokerController.remove
);

export default router;