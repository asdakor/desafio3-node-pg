import { Router } from "express";
import { cancionesController } from "../controllers/canciones.controller.js";
const router = Router()

router.post('/', cancionesController.cancionAgregar)
router.delete('/:id', cancionesController.cancionEliminar)
router.put('/:id', cancionesController.cancionEditar)
export default router;