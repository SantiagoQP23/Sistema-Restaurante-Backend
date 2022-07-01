import { INuevoDetallePedido } from './';
import { IDetallePedido, IDetallePendiente } from './pedidos';

export interface IPedidoNombreCliente {
  idPedido: number,
  cliente: string
}

export interface INuevoDetalle {
  detalle: INuevoDetallePedido,
  ok?: boolean
}

export interface IEliminarDetalle {
  idDetallePedido: number;
  idPedido?: number;
}

export interface IActualizarEstadoDetalle {
  idDetallePedido: number;
  cantEntregada: number;
}

export interface IActualizarCantidadDetalle {
  detalleActualizar: INuevoDetallePedido
}

export interface INuevoDetallePendiente{
}



export interface ServerToClientEvents {

  nuevoDetalle: (detalle: IDetallePedido) => void;
  eliminarDetalle: (data: IEliminarDetalle) => void;
  actualizarCantidadDetalle: (data: IActualizarCantidadDetalle) => void;
}

export interface ClientToServerEvents {

  cambiarNombreCliente: (data: IPedidoNombreCliente) => void;
  nuevoDetalle: (data: INuevoDetalle, callback: (data: INuevoDetalle) => void) => void;
  eliminarDetalle: (data: IEliminarDetalle, callback: () => void) => void;
  actualizarCantidadDetalle: (data: IActualizarCantidadDetalle, callback: () => void) => void;
}

