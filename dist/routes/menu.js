"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const menu_1 = require("../controllers/menu");
const router = (0, express_1.Router)();
router.use(validar_jwt_1.validarJWT);
// router.get("/", getMenu);// fin ruta
router.get("/secciones", menu_1.getSecciones);
router.get("/categorias", menu_1.getCategorias); // fin ruta
router.get("/productos", menu_1.getProductos); // fin ruta
exports.default = router;
//# sourceMappingURL=menu.js.map