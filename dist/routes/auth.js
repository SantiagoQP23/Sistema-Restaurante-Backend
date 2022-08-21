"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_auth_1 = require("../helpers/db-validators-auth");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_campos_1 = require("../middlewares/validar-campos");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/login', auth_1.login);
router.get('/renew', validar_jwt_1.validarJWT, auth_1.revalidarToken);
router.post('/usuarios/crear', validar_jwt_1.validarJWT, (0, express_validator_1.check)('idCargo').custom(db_validators_auth_1.esCargoValido), (0, express_validator_1.check)('nombreUsuario').custom(db_validators_auth_1.esNombreUsuarioValido), validar_campos_1.validarCampos, auth_1.crearUsuario);
router.get('/usuarios', validar_jwt_1.validarJWT, auth_1.getUsuarios);
exports.default = router;
//# sourceMappingURL=auth.js.map