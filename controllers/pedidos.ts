// Obetener los modelos

import { Request, Response } from "express";
import { INuevoDetallePedido } from "../interfaces";
import Pedido from "../models/pedido";
import Producto from "../models/producto";
import DetallePedido from "../models/detalle-pedido";
import Usuario from "../models/usuario";
import { IEliminarDetalle, IActualizarEstadoDetalle, IPedidoNombreCliente } from '../interfaces/sockets';
import { request } from "http";
import Cargo from "../models/cargo";
import { validarFecha } from "../helpers/datetime";



function obtenerFechaActual() {

  // Se debe mostrar solo los pedidos del dia actual
  var fecha = new Date(); //Fecha actual

  var mes: string | number = fecha.getMonth() + 1; //obteniendo mes
  var dia: string | number = fecha.getDate(); //obteniendo dia
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
export async function getPedidosPorFecha(req: Request, res: Response) {

  let { fecha } = req.query;

  

  if (!fecha) {
    fecha = obtenerFechaActual();
  }

  const fechaValida = validarFecha(fecha as string);

  if(!fechaValida) {
    return res.status(400).json({
      msg: 'Fecha no valida'
    })
  }

  //const pedidos = await Pedido.findAll();
  const pedidos = await Pedido.findAll({
    where: {
      fecha: `${fecha}`
    },
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

  });

  res.status(201).json({
    msg: `Pedidos del dia ${fecha}`,
    pedidos
  });
}

export const getPedidosPorMesero = async (req: Request, res: Response) => {

  let { fecha } = req.query;

  if (!fecha) {
    fecha = obtenerFechaActual();
  }

  const fechaValida = validarFecha(fecha as string);

  if(!fechaValida) {
    return res.status(400).json({
      msg: 'Fecha no valida'
    })
  }

  const meseros = await Usuario.findAll({
    attributes: ['idUsuario', 'nombreUsuario', 'nombres'],

    include: [
      {
        model: Pedido,
        as: 'pedidos',
        attributes: ['total', 'fecha'],
        where: {
          fecha: `${fecha}`
        }

      },
      {
        model: Cargo,
        as: 'cargo',
        attributes: ['idCargo','nombreCargo']
      }

    ],

 
  });

  return res.status(200).json({
    msg: 'Lista de pedidos por mesero',
    meseros
  })

}

export const getPedidosPorProducto = async (req: Request, res: Response) => {

  let { fecha } = req.query;

  if (!fecha) {
    fecha = obtenerFechaActual();
  }

  const fechaValida = validarFecha(fecha as string);

  if(!fechaValida) {
    return res.status(400).json({
      msg: 'Fecha no valida'
    })
  }

  const productos = await Producto.findAll({
    attributes: ['idProducto', 'nombre', 'precio'],
    include: [
      {
        model: DetallePedido,
        as: 'detalles',
        attributes: ['idDetallePedido', 'cantidad'],
        include: [
          {
            model: Pedido,
            as: 'pedido',
            attributes: ['total', 'fecha'],
            where: {
              fecha: `${fecha}`
            }
    
          }]
      }
    ]

 
  });

  return res.status(200).json({
    msg: 'Lista de pedidos por producto',
    productos
  })

}









export async function crearPedido(req: Request, res: Response) {
  // Todos los pedidos se crean en la fecha actual

  const fecha = obtenerFechaActual();

  const hora = obtenerHora();

  const pedidoNuevo = await Pedido.create({
    idUsuario: Number(req.uid),
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
      }]
  }
  )

  res.status(201).json({
    msg: "El pedido se creo correctamente",
    pedido
  }
  )
}

//OBTENER UN PEDIDO Y SUS DETALLES MEDIANTE SU ID
export async function getPedido(req: Request, res: Response) {

  const { idPedido } = req.params;

  const pedido = await Pedido.findByPk(idPedido, {

    include: {
      model: DetallePedido,
      as: 'detalles',
      include: [{
        model: Producto,
        as: 'producto',
        attributes: ['nombre', 'precio', 'descripcion']
      }]

    }
  })

  return res.status(201).send({ pedido });

}



// ACTUALZIAR EL NOMBRE CLIENTE
export async function actualizarNombreCliente(idPedido: number, nombreCliente: string) {


  await Pedido.update({
    nombreCliente: nombreCliente
  }, {
    where: {
      idPedido
    }
  });

}


export const actualizarEstadoPedido = async (req: Request, res: Response) => {

  const { idPedido } = req.params;

  await Pedido.update({
    estado: false
  }, {
    where: {
      idPedido
    }
  });

  res.status(201).json({
    msg: `El pedido ${idPedido} ha sido finalizado`
  });

}

export const eliminarPedido = async (req: Request, res: Response) => {

  const { idPedido } = req.params;

  await Pedido.destroy({
    where: {
      idPedido
    }
  });


  res.status(201).json({
    msg: `El pedido ${idPedido} ha sido eliminado`
  });



}


const actualizarTotalPedido = async (idPedido: number, subtotal: number, aumentar = true) => {

  // Obtener el total actual
  const pedido = await Pedido.findByPk(idPedido, {
    attributes: [
      'total'
    ]
  });

  let total: number;

  if (aumentar) {

    total = Number(subtotal) + Number(pedido!.total);
  } else {
    total = Number(pedido!.total) - Number(subtotal);

  }


  console.log("El total del pedido es: ", total);
  await Pedido.update({
    total
  }, {
    where: {
      idPedido
    }
  });

}



export const crearDetallePedido = async (detalle: INuevoDetallePedido) => {

  const { idPedido, idProducto, cantidad, descripcion } = detalle;

  // Actualizar el total del pedido
  const producto = await Producto.findByPk(idProducto, {
    attributes: [
      'precio'
    ]
  });

  const subtotal = producto!.precio * detalle.cantidad;



  actualizarTotalPedido(idPedido, subtotal);

  const detalleCreado = await DetallePedido.create({
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
  const nuevoDetalle = await DetallePedido.findByPk(detalleCreado.idDetallePedido,
    {

      include: [{
        model: Producto,
        as: 'producto',
        attributes: ['idProducto', 'nombre', 'precio', 'descripcion', 'linkFoto', 'idCategoria', 'cantidad']
      }]
    });


  return nuevoDetalle;

}



// ACTUALIZAR DETALLE DE PEDIDO CANTIDAD PEDIDA
export const actualizarCantidadDetalle = async (detalleCambiar: INuevoDetallePedido) => {
  const { idPedido, idDetallePedido, cantidad, descripcion } = detalleCambiar;

  const detalle = await DetallePedido.findByPk(idDetallePedido, {
    attributes: [
      'idProducto', 'cantidad'
    ]
  });

  if (cantidad === detalle!.cantidad && cantidad < detalle!.cantEntregada) {
    return detalle;
  }

  let diferencia = Math.abs(cantidad - detalle!.cantidad);

  const aumentar = cantidad > detalle!.cantidad;

  const producto = await Producto.findByPk(detalle!.idProducto, {
    attributes: [
      'precio'
    ]
  });


  const subtotal = producto!.precio * diferencia;

  // Establecer nuevo total al pedido
  actualizarTotalPedido(idPedido, subtotal, aumentar);


  const detalleActualizado = await DetallePedido.update({
    subtotal: producto!.precio * cantidad,
    estado: detalle!.cantEntregada !== cantidad,
    cantidad,
    //cantEntregada: cantidad < detalle!.cantEntregada ? cantidad : detalle!.cantEntregada,
    descripcion
  }, {
    where: {
      idDetallePedido: idDetallePedido
    }
  });

  const nuevoDetalle = await DetallePedido.findByPk(idDetallePedido,
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


  return nuevoDetalle;


}

// ACTUALIZAR EL ESTADO DEL DETALLE DE PEDIDO MEDIANTE LA CANTIDAD ENTREGADA
const actualizarEstadoDetalle = async (data: IActualizarEstadoDetalle) => {

  const { idDetallePedido, cantEntregada } = data;

  const detalle = await DetallePedido.findByPk(idDetallePedido, {
    attributes: [
      'cantidad', 'cantEntregada'
    ]
  });


  const nuevaCantidad = detalle!.cantEntregada + cantEntregada;

  const entregado = nuevaCantidad === detalle!.cantidad;

  /* 0: entregado
    1: Activo
     */

  await DetallePedido.update({
    cantEntregada: nuevaCantidad,
    estado: !entregado
  },
    {
      where: {
        idDetallePedido: idDetallePedido
      }
    });

  return { ok: true, entregado }

}


export const eliminarDetallePedido = async (idPedido: number, idDetallePedido: number) => {

  const detalleEliminar = await DetallePedido.findByPk(idDetallePedido, {
    attributes: [
      'subtotal'
    ]
  });

  actualizarTotalPedido(idPedido!, detalleEliminar!.subtotal, false)

  await DetallePedido.destroy({
    where: {
      idDetallePedido
    }
  })


}


export const getDetallesPendientes = async (req: Request, res: Response) => {

  console.log('Obteniendo los detalles pendientes')

  const detalles = await DetallePedido.findAll({
    where: {
      estado: true
    },
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



  res.status(200).json({
    detalles
  })


}

