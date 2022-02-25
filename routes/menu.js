const { Router } = require('express');

const { check } = require('express-validator');
const { login, revalidarToken } = require('../controllers/auth');
const { getMenu, getSecciones, getCategorias, getProductos } = require('../controllers/menu');




const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use( validarJWT )

router.get("/", getMenu);// fin ruta
router.get("/secciones", getSecciones);
router.get("/categorias", getCategorias);// fin ruta
router.get("/productos", getProductos);// fin ruta


module.exports = router;