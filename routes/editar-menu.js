const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

// Obtener controladores
const {
  aniadirSeccion,
  actualizarSeccion,
  eliminarSeccion,

  aniadirCategoria,
  actualizarCategoria,
  eliminarCategoria,

  aniadirProducto,
  actualizarProducto,
  eliminarProducto } = require("../controllers/editar-menu");


// Validaciones personalizadas

const {

  esSeccion,
  esSeccionValida,
  esCategoria,
  esProducto,
  esCategoriaValida,
  esProductoValido,
} = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.use(validarJWT);

router.post("/secciones/crear",
  check('nombreSeccion').custom(esSeccion),
  validarCampos,
  aniadirSeccion);// fin ruta

router.put("/secciones/actualizar/:idSeccion",
  check('idSeccion').custom(esSeccionValida),
  validarCampos,
  actualizarSeccion);// fin ruta

router.delete("/secciones/eliminar/:idSeccion",
  check('idSeccion').custom(esSeccionValida),
  validarCampos,
  eliminarSeccion);// fin ruta



router.post("/categorias/crear",
  check('nombreCategoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
  check('idSeccion').custom(esSeccionValida),
  check('nombreCategoria').custom(esCategoria),
  validarCampos,
  aniadirCategoria);// fin ruta

router.put("/categorias/actualizar/:idCategoria",
  check('nombreCategoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
  check('idCategoria').custom(esCategoriaValida),
  check('nombreCategoria').custom(esCategoria),
  check('idSeccion').custom(esSeccionValida),
  validarCampos,
  actualizarCategoria);// fin ruta

router.delete("/categorias/eliminar/:idCategoria",
  check('idCategoria').custom(esCategoriaValida),
  validarCampos,
  eliminarCategoria);// fin ruta


router.post("/productos/crear",
  check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
  check('precio', 'El precio del producto no es valido').isNumeric(),
  check('idCategoria').custom(esCategoriaValida),
  check('nombre').custom(esProducto),
  validarCampos,
  aniadirProducto);// fin ruta

router.put("/productos/actualizar/:idProducto",
  check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
  check('precio', 'El precio del producto no es valido').isNumeric(),
  check('idCategoria').custom(esCategoriaValida),
  check('idProducto').custom(esProductoValido),
  check('nombre').custom(esProducto),
  validarCampos,
  actualizarProducto);// fin ruta

router.delete("/productos/eliminar/:idProducto",
  check('idProducto').custom(esProductoValido),
  validarCampos,
  eliminarProducto);// fin ruta


module.exports = router;