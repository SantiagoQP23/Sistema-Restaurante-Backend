import DetallePedido from "./detalle-pedido";
import Pedido from "./pedido";
import Producto from "./producto";
import Usuario from "./usuario";
import {Server as socketio} from 'socket.io';
import { IActualizarCantidadDetalle, IEliminarDetalle, INuevoDetalle, IPedidoNombreCliente, INuevoDetallePendiente } from '../interfaces/sockets';


import { 
  actualizarNombreCliente, crearDetallePedido, 
  eliminarDetallePedido, actualizarCantidadDetalle } from "../controllers/pedidos";


class MySockets {

  private io: socketio;

  constructor(io: socketio) {

    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('cliente conectado');

      // Establecer el nombre del cliente que realizo el pedido
      socket.on('cambiarNombreCliente', async (data: IPedidoNombreCliente, callback) => {
        actualizarNombreCliente(data.idPedido, data.cliente);
        callback(true);
      });

      
  
      // Añadir un nuevo detalle al pedido
      socket.on('nuevoDetalle', async (data: INuevoDetalle, callback) => {
        const {detalle} = data;

        const nuevoDetalle = await crearDetallePedido(detalle);
        
        callback({nuevoDetalle, ok: true});

        // Enviar a la pantalla de pedidos pendientes
        this.io.emit('nuevoDetalle', {nuevoDetalle: nuevoDetalle});

      });

      socket.on('eliminarDetalle', async (data: IEliminarDetalle, callback) => {
 
        const {idPedido, idDetallePedido} = data;

        await eliminarDetallePedido(idPedido!, idDetallePedido);
        
        // Mensaje de confirmación al frontend
        callback({
          ok: true
        });
       

        this.io.emit('eliminarDetalle', ({idDetallePedido } as IEliminarDetalle));

      });


      /* { idDetalle, idPedido, cantidad, descripcion} */
      socket.on('actualizarCantidadDetalle', async (data: IActualizarCantidadDetalle, callback) => {
        
        const {detalleActualizar} = data;

        const detalleActualizado = await actualizarCantidadDetalle(detalleActualizar);

        console.log(detalleActualizado);

        callback({ok: true});

       this.io.emit('actualizarCantidadDetalle', ({detalle: detalleActualizado}) );

      });

    });
  }


}


export default MySockets;