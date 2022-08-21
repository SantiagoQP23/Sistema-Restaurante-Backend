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
exports.despacharDetalle = exports.eliminarPedido = exports.crearPedido = exports.usuarioDesconectado = exports.usuarioConectado = void 0;
const datetime_1 = require("../helpers/datetime");
const cargo_1 = __importDefault(require("../models/cargo"));
const detalle_pedido_1 = __importDefault(require("../models/detalle-pedido"));
const pedido_1 = __importDefault(require("../models/pedido"));
const producto_1 = __importDefault(require("../models/producto"));
const usuario_1 = __importDefault(require("../models/usuario"));
const usuarioConectado = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_1.default.update({ online: true }, { where: { idUsuario: uid } });
    const usuario = yield usuario_1.default.findByPk(uid, {
        attributes: [
            'idUsuario', 'nombreUsuario', 'nombres', 'online'
        ],
        include: {
            model: cargo_1.default,
            as: 'cargo',
            attributes: ['nombreCargo', 'idCargo']
        }
    });
    return usuario;
});
exports.usuarioConectado = usuarioConectado;
const usuarioDesconectado = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario_1.default.update({ online: false }, { where: { idUsuario: uid } });
});
exports.usuarioDesconectado = usuarioDesconectado;
const crearPedido = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const fecha = (0, datetime_1.obtenerFechaActual)();
    const hora = (0, datetime_1.obtenerHora)();
    const pedidoNuevo = yield pedido_1.default.create({
        idUsuario: Number(uid),
        hora,
        fecha,
        estado: true,
        nombreCliente: '',
        total: 0
    });
    const pedido = yield pedido_1.default.findByPk(pedidoNuevo.idPedido, {
        include: [
            {
                model: usuario_1.default,
                as: 'usuario',
                attributes: ['nombres']
            },
            {
                model: detalle_pedido_1.default,
                as: 'detalles',
                include: [
                    {
                        model: producto_1.default,
                        as: 'producto',
                    }
                ]
            }
        ]
    });
    return pedido;
});
exports.crearPedido = crearPedido;
const eliminarPedido = (idPedido) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pedido_1.default.destroy({
            where: {
                idPedido
            }
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.eliminarPedido = eliminarPedido;
const despacharDetalle = (idDetallePedido, cantidad) => __awaiter(void 0, void 0, void 0, function* () {
    const detalle = yield detalle_pedido_1.default.findByPk(idDetallePedido, {
        attributes: ['cantidad', 'cantEntregada']
    });
    if (cantidad > detalle.cantidad) {
        return { ok: false };
    }
    const entregado = cantidad === detalle.cantidad;
    yield detalle_pedido_1.default.update({
        cantEntregada: cantidad,
        estado: !entregado
    }, {
        where: {
            idDetallePedido: idDetallePedido
        }
    });
    const detalleActualizado = yield detalle_pedido_1.default.findByPk(idDetallePedido, {
        include: [{
                model: pedido_1.default,
                as: 'pedido',
                attributes: ['nombreCliente'],
                include: [{
                        model: usuario_1.default,
                        as: 'usuario',
                        attributes: ['nombres']
                    }]
            }, {
                model: producto_1.default,
                as: 'producto',
                attributes: ['nombre']
            }]
    });
    return { ok: true, detalle: detalleActualizado };
});
exports.despacharDetalle = despacharDetalle;
//# sourceMappingURL=sockets.js.map