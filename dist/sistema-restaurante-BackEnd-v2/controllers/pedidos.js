"use strict";
// Obetener los modelos
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
exports.getDetallesPendientes = exports.eliminarDetallePedido = exports.actualizarCantidadDetalle = exports.crearDetallePedido = exports.eliminarPedido = exports.actualizarEstadoPedido = exports.actualizarNombreCliente = exports.getPedido = exports.crearPedido = exports.getPedidosPorFecha = void 0;
const pedido_1 = __importDefault(require("../models/pedido"));
const producto_1 = __importDefault(require("../models/producto"));
const detalle_pedido_1 = __importDefault(require("../models/detalle-pedido"));
const usuario_1 = __importDefault(require("../models/usuario"));
/* const parsearFecha = (fechaTexto: string) => {
  // Se debe mostrar solo los pedidos del dia actual
  var fecha = new Date(fechaTexto); //Fecha actual

  var mes = fecha.getMonth() + 1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var anio = fecha.getFullYear(); //obteniendo año
  if (dia < 10)
    dia = '0' + dia; //agrega cero si el menor de 10
  if (mes < 10)
    mes = '0' + mes; //agrega cero si el menor de 10
  fecha = anio + "-" + mes + "-" + dia;

  return fecha;
} */
function obtenerFechaActual() {
    // Se debe mostrar solo los pedidos del dia actual
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var anio = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes; //agrega cero si el menor de 10
    return `${anio}-${mes}-${dia}`;
}
function obtenerHora() {
    const fecha = new Date();
    let hora = fecha.getHours();
    let minuto = fecha.getMinutes();
    let segundo = fecha.getSeconds();
    const horaCompleta = `${hora}:${minuto}:${segundo}`;
    return horaCompleta;
}
//OBTENER LOS PEDIDOS DE UNA FECHA
function getPedidosPorFecha(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { fecha } = req.query;
        // TODO: validar fecha
        // 1. Sockets con typescript 
        // Verificar controladores de sockets
        // Pruebas con la fecha
        if (!fecha) {
            fecha = obtenerFechaActual();
        }
        //const pedidos = await Pedido.findAll();
        const pedidos = yield pedido_1.default.findAll({
            where: {
                fecha: `${fecha}`
            },
            include: [
                {
                    model: usuario_1.default,
                    as: 'usuario',
                    attributes: ['nombres']
                }
            ]
        });
        res.status(201).json({
            msg: `Pedidos del dia ${fecha}`,
            pedidos
        });
    });
}
exports.getPedidosPorFecha = getPedidosPorFecha;
function crearPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todos los pedidos se crean en la fecha actual
        const fecha = obtenerFechaActual();
        const hora = obtenerHora();
        const pedidoNuevo = yield pedido_1.default.create({
            idUsuario: Number(req.uid),
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
                }
            ]
        });
        res.status(201).json({
            msg: "El pedido se creo correctamente",
            pedido
        });
    });
}
exports.crearPedido = crearPedido;
//OBTENER UN PEDIDO Y SUS DETALLES MEDIANTE SU ID
function getPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idPedido } = req.params;
        const pedido = yield pedido_1.default.findByPk(idPedido, {
            include: {
                model: detalle_pedido_1.default,
                as: 'detalles',
                include: [{
                        model: producto_1.default,
                        as: 'producto',
                        attributes: ['nombre', 'precio', 'descripcion']
                    }]
            }
        });
        return res.status(201).send({ pedido });
    });
}
exports.getPedido = getPedido;
// ACTUALZIAR EL NOMBRE CLIENTE
function actualizarNombreCliente(idPedido, nombreCliente) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pedido_1.default.update({
            nombreCliente: nombreCliente
        }, {
            where: {
                idPedido
            }
        });
    });
}
exports.actualizarNombreCliente = actualizarNombreCliente;
const actualizarEstadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPedido } = req.params;
    yield pedido_1.default.update({
        estado: false
    }, {
        where: {
            idPedido
        }
    });
    res.status(201).json({
        msg: `El pedido ${idPedido} ha sido finalizado`
    });
});
exports.actualizarEstadoPedido = actualizarEstadoPedido;
const eliminarPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPedido } = req.params;
    yield pedido_1.default.destroy({
        where: {
            idPedido
        }
    });
    res.status(201).json({
        msg: `El pedido ${idPedido} ha sido eliminado`
    });
});
exports.eliminarPedido = eliminarPedido;
const actualizarTotalPedido = (idPedido, subtotal, aumentar = true) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener el total actual
    const pedido = yield pedido_1.default.findByPk(idPedido, {
        attributes: [
            'total'
        ]
    });
    let total;
    if (aumentar) {
        total = Number(subtotal) + Number(pedido.total);
    }
    else {
        total = Number(pedido.total) - Number(subtotal);
    }
    console.log("El total del pedido es: ", total);
    yield pedido_1.default.update({
        total
    }, {
        where: {
            idPedido
        }
    });
});
const crearDetallePedido = (detalle) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPedido, idProducto, cantidad, descripcion } = detalle;
    // Actualizar el total del pedido
    const producto = yield producto_1.default.findByPk(idProducto, {
        attributes: [
            'precio'
        ]
    });
    const subtotal = producto.precio * detalle.cantidad;
    actualizarTotalPedido(idPedido, subtotal);
    const detalleCreado = yield detalle_pedido_1.default.create({
        subtotal,
        idPedido,
        cantidad,
        hora: obtenerHora(),
        descripcion,
        estado: true,
        idProducto,
        cantEntregada: 0,
    });
    // En el frontend saneo la informmación para añadir el detalle  al pedido
    const nuevoDetalle = yield detalle_pedido_1.default.findByPk(detalleCreado.idDetallePedido, {
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
    return nuevoDetalle;
});
exports.crearDetallePedido = crearDetallePedido;
// ACTUALIZAR DETALLE DE PEDIDO CANTIDAD PEDIDA
const actualizarCantidadDetalle = (detalleCambiar) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPedido, idDetallePedido, cantidad, descripcion } = detalleCambiar;
    const detalle = yield detalle_pedido_1.default.findByPk(idDetallePedido, {
        attributes: [
            'idProducto', 'cantidad'
        ]
    });
    if (cantidad === detalle.cantidad && cantidad < detalle.cantEntregada) {
        return detalle;
    }
    let diferencia = Math.abs(cantidad - detalle.cantidad);
    const aumentar = cantidad > detalle.cantidad;
    const producto = yield producto_1.default.findByPk(detalle.idProducto, {
        attributes: [
            'precio'
        ]
    });
    const subtotal = producto.precio * diferencia;
    // Establecer nuevo total al pedido
    actualizarTotalPedido(idPedido, subtotal, aumentar);
    const detalleActualizado = yield detalle_pedido_1.default.update({
        subtotal: producto.precio * cantidad,
        estado: detalle.cantEntregada !== cantidad,
        cantidad,
        //cantEntregada: cantidad < detalle!.cantEntregada ? cantidad : detalle!.cantEntregada,
        descripcion
    }, {
        where: {
            idDetallePedido: idDetallePedido
        }
    });
    return detalleActualizado;
});
exports.actualizarCantidadDetalle = actualizarCantidadDetalle;
// ACTUALIZAR EL ESTADO DEL DETALLE DE PEDIDO MEDIANTE LA CANTIDAD ENTREGADA
const actualizarEstadoDetalle = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { idDetallePedido, cantEntregada } = data;
    const detalle = yield detalle_pedido_1.default.findByPk(idDetallePedido, {
        attributes: [
            'cantidad', 'cantEntregada'
        ]
    });
    const nuevaCantidad = detalle.cantEntregada + cantEntregada;
    const entregado = nuevaCantidad === detalle.cantidad;
    /* 0: entregado
      1: Activo
       */
    yield detalle_pedido_1.default.update({
        cantEntregada: nuevaCantidad,
        estado: !entregado
    }, {
        where: {
            idDetallePedido: idDetallePedido
        }
    });
    return { ok: true, entregado };
});
const eliminarDetallePedido = (idPedido, idDetallePedido) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleEliminar = yield detalle_pedido_1.default.findByPk(idDetallePedido, {
        attributes: [
            'subtotal'
        ]
    });
    actualizarTotalPedido(idPedido, detalleEliminar.subtotal, false);
    yield detalle_pedido_1.default.destroy({
        where: {
            idDetallePedido
        }
    });
});
exports.eliminarDetallePedido = eliminarDetallePedido;
const getDetallesPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Obteniendo los detalles pendientes');
    const detalles = yield detalle_pedido_1.default.findAll({
        where: {
            estado: true
        },
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
    res.status(200).json({
        detalles
    });
});
exports.getDetallesPendientes = getDetallesPendientes;
//# sourceMappingURL=pedidos.js.map