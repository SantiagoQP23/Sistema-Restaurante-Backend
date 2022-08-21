"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarios = exports.crearUsuario = exports.revalidarToken = exports.login = void 0;
const generar_jwt_1 = require("../helpers/generar-jwt");
const cargo_1 = __importDefault(require("../models/cargo"));
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreUsuario, password } = req.body;
        // Verificar si el nombr de usuario existe
        const usuario = yield usuario_1.default.findOne({
            where: {
                nombreUsuario
            },
            attributes: [
                'password'
            ],
        });
        if (!usuario) {
            return res.status(400).json({
                msg: "No se encontro al usuario"
            });
        }
        // Obtener los datos del usuario que se van a enviar al frontend
        const user = yield usuario_1.default.findOne({
            where: {
                nombreUsuario
            },
            attributes: [
                'idUsuario', 'nombreUsuario', 'nombres'
            ],
            include: {
                model: cargo_1.default,
                as: 'cargo',
                attributes: ['nombreCargo', 'idCargo']
            }
        });
        // Verificar la constraseña 
        // Comparar con bcrypt
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }
        // Generar el JWT
        const token = yield (0, generar_jwt_1.generarJWT)(`${user.idUsuario}`);
        return res.json({ ok: true, usuario: user, token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
});
exports.login = login;
const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Revalidando token");
    const idUsuario = req.uid;
    const usuario = yield usuario_1.default.findByPk(idUsuario, {
        attributes: [
            'idUsuario', 'nombreUsuario', 'nombres'
        ],
        include: {
            model: cargo_1.default,
            as: 'cargo',
            attributes: ['nombreCargo', 'idCargo']
        }
    });
    const token = yield (0, generar_jwt_1.generarJWT)(idUsuario);
    res.status(200).json({
        ok: true,
        usuario,
        token
    });
});
exports.revalidarToken = revalidarToken;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombres, idCargo, nombreUsuario, password } = req.body;
    console.log("creando usuario", nombreUsuario);
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hash = yield bcryptjs_1.default.hash(password, salt);
    yield usuario_1.default.create({
        nombres, idCargo, nombreUsuario, password: hash, online: false,
        estado: true
    });
    const usuario = yield usuario_1.default.findOne({
        where: {
            nombreUsuario
        },
        attributes: [
            'idUsuario', 'nombreUsuario', 'nombres',
        ],
        include: {
            model: cargo_1.default,
            as: 'cargo',
            attributes: ['nombreCargo', 'idCargo']
        }
    });
    res.status(201).json({
        msg: 'El usuario fue creado correctamente',
        usuario
    });
});
exports.crearUsuario = crearUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        attributes: [
            'idUsuario', 'nombreUsuario', 'nombres', 'online'
        ],
        include: {
            model: cargo_1.default,
            as: 'cargo',
            attributes: ['nombreCargo', 'idCargo']
        }
    });
    res.status(200).json({
        msg: 'La lista de usuarios se obtuvo correctamente',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
//# sourceMappingURL=auth.js.map