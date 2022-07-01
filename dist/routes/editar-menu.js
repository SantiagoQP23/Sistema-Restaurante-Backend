"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_jwt_1 = require("../middlewares/validar-jwt");
// Obtener controladores
const editar_menu_1 = require("../controllers/editar-menu");
const validar_campos_1 = require("../middlewares/validar-campos");
// Validaciones personalizadas
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.use(validar_jwt_1.validarJWT);
router.post("/secciones/crear", (0, express_validator_1.check)('nombreSeccion').custom(db_validators_1.esSeccion), validar_campos_1.validarCampos, editar_menu_1.aniadirSeccion); // fin ruta
router.put("/secciones/actualizar/:idSeccion", (0, express_validator_1.check)('idSeccion').custom(db_validators_1.esSeccionValida), validar_campos_1.validarCampos, editar_menu_1.actualizarSeccion); // fin ruta
router.delete("/secciones/eliminar/:idSeccion", (0, express_validator_1.check)('idSeccion').custom(db_validators_1.esSeccionValida), validar_campos_1.validarCampos, editar_menu_1.eliminarSeccion); // fin ruta
router.post("/categorias/crear", (0, express_validator_1.check)('nombreCategoria', 'El nombre de la categoria es obligatorio').not().isEmpty(), (0, express_validator_1.check)('idSeccion').custom(db_validators_1.esSeccionValida), (0, express_validator_1.check)('nombreCategoria').custom(db_validators_1.esCategoria), validar_campos_1.validarCampos, editar_menu_1.aniadirCategoria); // fin ruta
router.put("/categorias/actualizar/:idCategoria", (0, express_validator_1.check)('nombreCategoria', 'El nombre de la categoria es obligatorio').not().isEmpty(), (0, express_validator_1.check)('idCategoria').custom(db_validators_1.esCategoriaValida), (0, express_validator_1.check)('nombreCategoria').custom(db_validators_1.esCategoria), (0, express_validator_1.check)('idSeccion').custom(db_validators_1.esSeccionValida), validar_campos_1.validarCampos, editar_menu_1.actualizarCategoria); // fin ruta
router.delete("/categorias/eliminar/:idCategoria", (0, express_validator_1.check)('idCategoria').custom(db_validators_1.esCategoriaValida), validar_campos_1.validarCampos, editar_menu_1.eliminarCategoria); // fin ruta
router.post("/productos/crear", (0, express_validator_1.check)('nombre', 'El nombre del producto es obligatorio').not().isEmpty(), (0, express_validator_1.check)('precio', 'El precio del producto no es valido').isNumeric(), (0, express_validator_1.check)('idCategoria').custom(db_validators_1.esCategoriaValida), (0, express_validator_1.check)('nombre').custom(db_validators_1.esProducto), validar_campos_1.validarCampos, editar_menu_1.aniadirProducto); // fin ruta
router.put("/productos/actualizar/:idProducto", (0, express_validator_1.check)('nombre', 'El nombre del producto es obligatorio').not().isEmpty(), (0, express_validator_1.check)('precio', 'El precio del producto no es valido').isNumeric(), (0, express_validator_1.check)('idCategoria').custom(db_validators_1.esCategoriaValida), (0, express_validator_1.check)('idProducto').custom(db_validators_1.esProductoValido), (0, express_validator_1.check)('nombre').custom(db_validators_1.esProducto), validar_campos_1.validarCampos, editar_menu_1.actualizarProducto); // fin ruta
router.delete("/productos/eliminar/:idProducto", (0, express_validator_1.check)('idProducto').custom(db_validators_1.esProductoValido), validar_campos_1.validarCampos, editar_menu_1.eliminarProducto); // fin ruta
exports.default = router;
//# sourceMappingURL=editar-menu.js.map