import { Router } from "express";
import multer from 'multer';
import * as divisiController from "../controllers/divisiControllers.js";
import { authenticateToken } from "../middlewares/auth.js";


const router: Router = Router();
const upload = multer();

router.get("/", divisiController.getAllDivisi);
router.get("/:id", divisiController.getDivisiById);
router.post("/", authenticateToken, upload.none(),divisiController.createDivisi);
router.put("/:id", authenticateToken, upload.none(),divisiController.updateDivisi);
router.delete("/:id", authenticateToken, upload.none(),divisiController.deleteDivisi);

export default router;