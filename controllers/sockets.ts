import { obtenerFechaActual, obtenerHora } from "../helpers/datetime";
import Cargo from "../models/cargo";
import DetallePedido from "../models/detalle-pedido";
import Pedido from "../models/pedido";
import Producto from "../models/producto";
import Usuario from "../models/usuario";



export const usuarioConectado = async (uid: string) => {

  await Usuario.update({ online: true }, { where: { idUsuario: uid } })

  const usuario = await Usuario.findByPk(uid, {
    attributes: [
      'idUsuario', 'nombreUsuario', 'nombres', 'online'
    ],
    include: {
      model: Cargo,
      as: 'cargo',
      attributes: ['nombreCargo', 'idCargo']
    }
  });




  return usuario;
}



export const usuarioDesconectado = async (uid: string) => {

  await Usuario.update({ online: false }, { where: { idUsuario: uid } })

}



export const crearPedido = async (uid: string) => {

  const fecha = obtenerFechaActual();

  const hora = obtenerHora();

  const pedidoNuevo = await Pedido.create({
    idUsuario: Number(uid),
    hora,
    fecha,
    estado: true,
    nombreCliente: '',
    total: 0
  });


  const pedido = await Pedido.findByPk(pedidoNuevo.idPedido, {

    include: [
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['nombres']
      },
      {
        model: DetallePedido,
        as: 'detalles',
        include: [
          {
            model: Producto,
            as: 'producto',
          }
        ]

      }
    ]
  })

  return pedido;
}

export const eliminarPedido = async (idPedido: number) => {

  try {
    await Pedido.destroy({
      where: {
        idPedido
      }
    });
    return true;

  } catch (error) {

    console.log(error);
    return false;
  }



}

export const despacharDetalle = async (idDetallePedido:number, cantidad: number) => {

  const detalle = await DetallePedido.findByPk(idDetallePedido, {
    attributes: ['cantidad', 'cantEntregada']
  });

  if(cantidad > detalle!.cantidad) {
    return {ok: false};
  }

  const entregado = cantidad === detalle!.cantidad;

  await DetallePedido.update({
    cantEntregada: cantidad,
    estado: !entregado
  },
    {
      where: {
        idDetallePedido: idDetallePedido
      }
    });


    const detalleActualizado = await DetallePedido.findByPk(idDetallePedido,
      {
  
        include: [{
          model: Pedido,
          as: 'pedido',
          attributes: ['nombreCliente'],
          include: [{
            model: Usuario,
            as: 'usuario',
            attributes: ['nombres']
          }]
        }, {
          model: Producto,
          as: 'producto',
          attributes: ['nombre']
        }]
      });

  return {ok: true, detalle: detalleActualizado}

  
}