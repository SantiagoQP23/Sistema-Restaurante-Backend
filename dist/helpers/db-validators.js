"use strict";
// Requeri modelos
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
exports.esDetallePedidoValido = exports.esPedidoEntregado = exports.esPedidoFinalizado = exports.esPedidoValido = exports.esProductoValido = exports.esCategoriaValida = exports.esSeccionValida = exports.esProducto = exports.esCategoria = exports.esSeccion = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const detalle_pedido_1 = __importDefault(require("../models/detalle-pedido"));
const pedido_1 = __importDefault(require("../models/pedido"));
const producto_1 = __importDefault(require("../models/producto"));
const seccion_1 = __importDefault(require("../models/seccion"));
const esSeccion = (nombreSeccion = '') => __awaiter(void 0, void 0, void 0, function* () {
    const seccion = yield seccion_1.default.findOne({
        where: {
            nombreSeccion
        }
    });
    if (seccion) {
        throw new Error(`La seccion ${nombreSeccion} ya existe`);
    }
});
exports.esSeccion = esSeccion;
const esCategoria = (nombreCategoria = '') => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_1.default.findOne({
        where: {
            nombreCategoria
        }
    });
    if (categoria) {
        throw new Error(`La categoria ${nombreCategoria} ya existe`);
    }
});
exports.esCategoria = esCategoria;
const esProducto = (nombre = '') => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield producto_1.default.findOne({
        attributes: [
            'idProducto'
        ],
        where: {
            nombre
        }
    });
    if (producto) {
        throw new Error(`El producto ${nombre} ya existe`);
    }
});
exports.esProducto = esProducto;
const esSeccionValida = (idSeccion = '') => __awaiter(void 0, void 0, void 0, function* () {
    const seccion = yield seccion_1.default.findByPk(idSeccion);
    if (!seccion) {
        throw new Error(`La sección con el id ${idSeccion} no existe`);
    }
});
exports.esSeccionValida = esSeccionValida;
const esCategoriaValida = (idCategoria = '') => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_1.default.findByPk(idCategoria);
    if (!categoria) {
        throw new Error(`La categoria con el id ${idCategoria} no existe`);
    }
});
exports.esCategoriaValida = esCategoriaValida;
const esProductoValido = (idProducto = '') => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield producto_1.default.findByPk(idProducto);
    if (!producto) {
        throw new Error(`El producto con el id ${idProducto} no existe`);
    }
});
exports.esProductoValido = esProductoValido;
const esPedidoValido = (idPedido = '') => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = yield pedido_1.default.findByPk(idPedido);
    if (!pedido) {
        throw new Error(`No se encontro el pedido con el id ${idPedido}`);
    }
});
exports.esPedidoValido = esPedidoValido;
// Si el pedido ya fue pagado
const esPedidoFinalizado = (idPedido = '') => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = yield pedido_1.default.findByPk(idPedido, {
        attributes: [
            'estado'
        ]
    });
    if (!(pedido === null || pedido === void 0 ? void 0 : pedido.estado)) {
        throw new Error(`El pedido con el id ${idPedido} ya esta finalizado`);
    }
});
exports.esPedidoFinalizado = esPedidoFinalizado;
const esPedidoEntregado = (idPedido = '') => __awaiter(void 0, void 0, void 0, function* () {
    const detallesPedidos = yield detalle_pedido_1.default.findAll({
        attributes: [
            'estado'
        ],
        where: {
            idPedido
        }
    });
    detallesPedidos.map(detalle => {
        if (detalle.estado)
            throw new Error(`El pedido no se ha entregado completamente`);
    });
});
exports.esPedidoEntregado = esPedidoEntregado;
const esDetallePedidoValido = (idDetalle = '') => __awaiter(void 0, void 0, void 0, function* () {
    const detalle = yield detalle_pedido_1.default.findByPk(idDetalle, {
        attributes: [
            'idDetallePedido'
        ]
    });
    if (!detalle) {
        throw new Error(`No se encontro el detalle de pedido con el id ${idDetalle}`);
    }
});
exports.esDetallePedidoValido = esDetallePedidoValido;
const esDetallePedidoFinalizado = (idDetalle = '') => __awaiter(void 0, void 0, void 0, function* () {
    const detalle = yield detalle_pedido_1.default.findByPk(idDetalle, {
        attributes: [
            'estado'
        ]
    });
    // const detalles = await connection.query("SELECT estado from detalles_pedidos where idDetallePedido = ?", [idDetalle]);
    if (detalle === null || detalle === void 0 ? void 0 : detalle.estado) {
        throw new Error(`El detalle de pedido no ha sido entregado completamente`);
    }
});
const esDetallePedidoActivo = (idDetalle = '') => __awaiter(void 0, void 0, void 0, function* () {
    const detalle = yield detalle_pedido_1.default.findByPk(idDetalle, {
        attributes: [
            'estado'
        ]
    });
    if (!(detalle === null || detalle === void 0 ? void 0 : detalle.estado)) {
        throw new Error(`El detalle de pedido ya se entrego completamente`);
    }
});
//# sourceMappingURL=db-validators.js.map