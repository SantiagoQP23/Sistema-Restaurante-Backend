
import {Server as socketio} from 'socket.io';
import { IActualizarCantidadDetalle, IEliminarDetalle, INuevoDetalle, IPedidoNombreCliente, INuevoDetallePendiente } from '../interfaces/sockets';
import { IDetallePedido, INuevoDetallePedido, IPedido } from '../interfaces/pedidos';


import { 
  actualizarNombreCliente, crearDetallePedido, 
  eliminarDetallePedido, actualizarCantidadDetalle } from "../controllers/pedidos";
import { comprobarJWT } from "../helpers/jwt";
import { crearPedido, despacharDetalle, eliminarPedido, usuarioConectado, usuarioDesconectado } from "../controllers/sockets";


class MySockets {

  private io: socketio;

  constructor(io: socketio) {

    this.io = io; 

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', async (socket) => {


     const [valido, uid] = comprobarJWT( socket.handshake.query['x-token'] as string);

     if(!valido){
      console.log('Socket no identificado');
      return socket.disconnect();
     }

     const usuario = await usuarioConectado(uid as string);

      console.log('cliente conectado', usuario?.nombres, usuario?.online);

      // Establecer el nombre del cliente que realizo el pedido
      socket.on('cambiarNombreCliente', async (data: IPedidoNombreCliente, callback) => {
        actualizarNombreCliente(data.idPedido, data.cliente);
        callback(true);
      });
 
      // Añadir un nuevo detalle al pedido
      socket.on('nuevoDetalle', async (data: {detalle: INuevoDetallePedido, ok?: boolean}, callback) => {
        const {detalle} = data;

        const nuevoDetalle = await crearDetallePedido(detalle);
        
        callback({nuevoDetalle, ok: true});

        // Enviar a la pantalla de pedidos pendientes
        this.io.emit('nuevoDetalle', {nuevoDetalle: nuevoDetalle});

      });

      socket.on('nuevoPedido', async (data: {pedido: IPedido, ok?: boolean}, callback) => {
        /* const {detalle} = data;

        const nuevoDetalle = await crearDetallePedido(detalle);
        
        callback({nuevoDetalle, ok: true});

        // Enviar a la pantalla de pedidos pendientes
        this.io.emit('nuevoDetalle', {nuevoDetalle: nuevoDetalle}); */

      });

      socket.on('eliminarDetalle', async (data: IEliminarDetalle, callback) => {
 
        const {idPedido, idDetallePedido} = data;

        await eliminarDetallePedido(idPedido!, idDetallePedido);
        
        // Mensaje de confirmación al frontend
        callback({
          ok: true
        });
       

        this.io.emit('eliminarDetalle', ({idDetallePedido , idPedido: Number(idPedido)} as IEliminarDetalle));

      });


      /* { idDetalle, idPedido, cantidad, descripcion} */
      socket.on('actualizarCantidadDetalle', async (data: IActualizarCantidadDetalle, callback) => {
        
        const {detalleActualizar} = data;

        const detalleActualizado = await actualizarCantidadDetalle(detalleActualizar);

       /*  console.log(detalleActualizado); */

        callback({ok: true});

       this.io.emit('actualizarCantidadDetalle', ({detalle: detalleActualizado}) );

      });


      socket.on('nuevoPedido', async (data, callback) => {
        const pedido = await crearPedido(uid as string);

        if(pedido){
          callback({ok: true})
          this.io.emit('nuevoPedido', ({pedido}));
        }



      });

      socket.on('eliminarPedido', async ({idPedido}: {idPedido: number}, callback) => {

        const ok = await eliminarPedido(idPedido);

        callback({ok});
        this.io.emit('eliminarPedido', ({idPedido} as {idPedido:number}));
        
      });


      socket.on('despacharDetalle', async ({idPedido, idDetallePedido, cantidad}:{idPedido: number, idDetallePedido: number, cantidad: number}, callback) => {

        const {ok, detalle} = await despacharDetalle(idDetallePedido, cantidad);

        if(ok){
          this.io.emit('despacharDetalle', {detalle})
          callback({ok});
        }


        
      })



      socket.on('disconnect', () => {
        console.log('Cliente desconectado', uid);
        usuarioDesconectado(uid as string);

      });


    });
  }


}


export default MySockets;