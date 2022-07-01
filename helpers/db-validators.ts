// Requeri modelos

import Categoria from "../models/categoria";
import DetallePedido from "../models/detalle-pedido";
import Pedido from "../models/pedido";
import Producto from "../models/producto";
import Seccion from "../models/seccion";



export const esSeccion = async(nombreSeccion = '') => {

  const seccion = await Seccion.findOne({
    where: {
      nombreSeccion
    }
  });

  if( seccion ){
    throw new Error(`La seccion ${nombreSeccion} ya existe`)
  }
}

export const esCategoria = async(nombreCategoria = '') => {
  
  const categoria = await Categoria.findOne({
    where: {
      nombreCategoria
    }
  });

  if( categoria ){
    throw new Error(`La categoria ${nombreCategoria} ya existe`)
  }
}

export const esProducto = async(nombre = '') => {
  const producto = await Producto.findOne({
    attributes: [
      'idProducto'
   ],
   where: {
     nombre
   }
  })

  if( producto){
    throw new Error(`El producto ${nombre} ya existe`)
  }
}

export const esSeccionValida = async( idSeccion = '') => {

  const seccion = await Seccion.findByPk(idSeccion);

  if( !seccion ) {
    throw new Error(`La sección con el id ${idSeccion} no existe`);
  }


}

export const esCategoriaValida = async( idCategoria = '') => {

  const categoria = await Categoria.findByPk(idCategoria);

  if( !categoria ) {
    throw new Error(`La categoria con el id ${idCategoria} no existe`);
  }


}

export const esProductoValido = async( idProducto = '') => {
  
  const producto = await Producto.findByPk(idProducto);

  if( !producto ) {
    throw new Error(`El producto con el id ${idProducto} no existe`);
  }


}

export const esPedidoValido = async (idPedido = '') => {

  const pedido = await Pedido.findByPk(idPedido);

  if( !pedido ){
    throw new Error(`No se encontro el pedido con el id ${idPedido}`);
  }
}

export interface IPedido {

  idPedido: number,
  idUsuario: number,
  total: number,
  fecha: Date,
  nombreCliente: string,
  estado: boolean,
  hora: Date,
}



// Si el pedido ya fue pagado
export const esPedidoFinalizado = async (idPedido = '') => {

  const pedido = await Pedido.findByPk(idPedido, {
    attributes: [
      'estado'
    ]
  });
  
  if(!pedido?.estado){
    throw new Error(`El pedido con el id ${idPedido} ya esta finalizado`);
  }
  
}


export const esPedidoEntregado = async (idPedido = '') => {

  const detallesPedidos = await DetallePedido.findAll({
    attributes: [
      'estado'
    ],
    where: {
      idPedido
    }
  });


  detallesPedidos.map( detalle => {
    if( detalle.estado ) 
      throw new Error(`El pedido no se ha entregado completamente`)
   });

}


export const esDetallePedidoValido = async (idDetalle = '') => {

  const detalle = await DetallePedido.findByPk(idDetalle, {
    attributes: [
      'idDetallePedido'
    ]
  });
  
  if(!detalle) {
    throw new Error(`No se encontro el detalle de pedido con el id ${idDetalle}`);
  }
  
}

const esDetallePedidoFinalizado = async (idDetalle = '') => {
  
  
    const detalle = await DetallePedido.findByPk(idDetalle, {
      attributes: [
        'estado'
      ]
    });
    
    // const detalles = await connection.query("SELECT estado from detalles_pedidos where idDetallePedido = ?", [idDetalle]);
    
    if( detalle?.estado ) {
    throw new Error(`El detalle de pedido no ha sido entregado completamente`)
  }
  
}

const esDetallePedidoActivo = async (idDetalle = '') => {
  
  const detalle = await DetallePedido.findByPk(idDetalle, {
    attributes: [
      'estado'
    ]
  });


  if( !detalle?.estado) {
    throw new Error(`El detalle de pedido ya se entrego completamente`)
  }
  
}




