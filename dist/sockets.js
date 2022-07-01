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
const DetallePedido = require("./detalle-pedido");
const Pedido = require("./pedido");
const Producto = require("./producto");
const Usuario = require("./Usuario");
const { actualizarTotalPedido, obtenerHora, actualizarNombreCliente, crearDetallePedido, eliminarDetallePedido, actualizarCantidadDetalle } = require("../controllers/pedidos");
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('cliente conectado');
            // Establecer el nombre del cliente que realizo el pedido
            socket.on('cambiar-nombre-cliente', (data) => __awaiter(this, void 0, void 0, function* () {
                actualizarNombreCliente(data);
            }));
            /*
            {
              idPedido, idProducto cantidad   descripcion
            } */
            // Añadir un nuevo detalle al pedido
            socket.on('nuevo-detalle', ({ detalle }, callback) => __awaiter(this, void 0, void 0, function* () {
                const nuevoDetalle = yield crearDetallePedido(detalle);
                callback({ nuevoDetalle, ok: true });
                this.io.emit('nuevo-detalle', { nuevoDetalle });
            }));
            /* {idPedido, idDetallePedido} */
            // Eliminar un detalle de pedido
            socket.on('eliminarDetalle', ({ detalleEliminar }, callback) => __awaiter(this, void 0, void 0, function* () {
                yield eliminarDetallePedido(detalleEliminar);
                callback({
                    ok: true
                });
                ;
                this.io.emit('eliminarDetalle', ({ idDetalle: detalleEliminar.idDetallePedido }));
            }));
            /* { idDetalle, idPedido, cantidad, descripcion} */
            socket.on('cambiar-cantidad', ({ detalleActualizar }, callback) => __awaiter(this, void 0, void 0, function* () {
                const detalleActualizado = yield actualizarCantidadDetalle(detalleActualizar);
                callback({ ok: true });
                this.io.emit('actualizar-cantidad-detalle', ({ detalle: {
                        idDetalle: detalleActualizar.idDetalle,
                        cantidad: detalleActualizar.cantidad
                    } }));
            }));
        });
    }
}
module.exports = Sockets;
//# sourceMappingURL=sockets.js.map