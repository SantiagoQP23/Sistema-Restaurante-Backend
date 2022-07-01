import { Router } from "express";

import { validarJWT } from '../middlewares/validar-jwt';
import {  getSecciones, getCategorias, getProductos } from '../controllers/menu';





const router = Router();

router.use( validarJWT )

// router.get("/", getMenu);// fin ruta
router.get("/secciones", getSecciones);
router.get("/categorias", getCategorias);// fin ruta
router.get("/productos", getProductos);// fin ruta

export default router;