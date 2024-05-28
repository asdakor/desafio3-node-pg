import { Router } from "express";
import { cancionesController } from "../controllers/canciones.controller.js";
const router = Router()

router.get('/', cancionesController.canciones)
router.post('/', cancionesController.cancionAgregar)
router.delete('/:id', cancionesController.cancionEliminar)
export default router;