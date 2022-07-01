"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.post('/login', auth_1.login);
router.get('/renew', validar_jwt_1.validarJWT, auth_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map