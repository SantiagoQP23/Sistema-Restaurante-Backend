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
Object.defineProperty(exports, "__esModule", { value: true });
const pedidos_1 = require("../controllers/pedidos");
const jwt_1 = require("../helpers/jwt");
const sockets_1 = require("../controllers/sockets");
class MySockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            const [valido, uid] = (0, jwt_1.comprobarJWT)(socket.handshake.query['x-token']);
            if (!valido) {
                console.log('Socket no identificado');
                return socket.disconnect();
            }
            const usuario = yield (0, sockets_1.usuarioConectado)(uid);
            console.log('cliente conectado', usuario === null || usuario === void 0 ? void 0 : usuario.nombres, usuario === null || usuario === void 0 ? void 0 : usuario.online);
            // Establecer el nombre del cliente que realizo el pedido
            socket.on('cambiarNombreCliente', (data, callback) => __awaiter(this, void 0, void 0, function* () {
                (0, pedidos_1.actualizarNombreCliente)(data.idPedido, data.cliente);
                callback(true);
            }));
            // Añadir un nuevo detalle al pedido
            socket.on('nuevoDetalle', (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const { detalle } = data;
                const nuevoDetalle = yield (0, pedidos_1.crearDetallePedido)(detalle);
                callback({ nuevoDetalle, ok: true });
                // Enviar a la pantalla de pedidos pendientes
                this.io.emit('nuevoDetalle', { nuevoDetalle: nuevoDetalle });
            }));
            socket.on('nuevoPedido', (data, callback) => __awaiter(this, void 0, void 0, function* () {
                /* const {detalle} = data;
        
                const nuevoDetalle = await crearDetallePedido(detalle);
                
                callback({nuevoDetalle, ok: true});
        
                // Enviar a la pantalla de pedidos pendientes
                this.io.emit('nuevoDetalle', {nuevoDetalle: nuevoDetalle}); */
            }));
            socket.on('eliminarDetalle', (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const { idPedido, idDetallePedido } = data;
                yield (0, pedidos_1.eliminarDetallePedido)(idPedido, idDetallePedido);
                // Mensaje de confirmación al frontend
                callback({
                    ok: true
                });
                this.io.emit('eliminarDetalle', { idDetallePedido, idPedido: Number(idPedido) });
            }));
            /* { idDetalle, idPedido, cantidad, descripcion} */
            socket.on('actualizarCantidadDetalle', (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const { detalleActualizar } = data;
                const detalleActualizado = yield (0, pedidos_1.actualizarCantidadDetalle)(detalleActualizar);
                /*  console.log(detalleActualizado); */
                callback({ ok: true });
                this.io.emit('actualizarCantidadDetalle', ({ detalle: detalleActualizado }));
            }));
            socket.on('nuevoPedido', (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const pedido = yield (0, sockets_1.crearPedido)(uid);
                if (pedido) {
                    callback({ ok: true });
                    this.io.emit('nuevoPedido', ({ pedido }));
                }
            }));
            socket.on('eliminarPedido', ({ idPedido }, callback) => __awaiter(this, void 0, void 0, function* () {
                const ok = yield (0, sockets_1.eliminarPedido)(idPedido);
                callback({ ok });
                this.io.emit('eliminarPedido', { idPedido });
            }));
            socket.on('despacharDetalle', ({ idPedido, idDetallePedido, cantidad }, callback) => __awaiter(this, void 0, void 0, function* () {
                const { ok, detalle } = yield (0, sockets_1.despacharDetalle)(idDetallePedido, cantidad);
                if (ok) {
                    this.io.emit('despacharDetalle', { detalle });
                    callback({ ok });
                }
            }));
            socket.on('disconnect', () => {
                console.log('Cliente desconectado', uid);
                (0, sockets_1.usuarioDesconectado)(uid);
            });
        }));
    }
}
exports.default = MySockets;
//# sourceMappingURL=sockets.js.map