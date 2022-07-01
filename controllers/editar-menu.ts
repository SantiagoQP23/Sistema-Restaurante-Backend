import { Request, Response } from "express";
import Categoria from "../models/categoria";
import Producto from "../models/producto";
import Seccion from "../models/seccion";


// Estado 200 para eliminar y obtener
// Estado 201 para crear y actualizar



export async function aniadirSeccion(req: Request, res: Response) {


  const { nombreSeccion } = req.body;

  const seccion = await Seccion.create({ nombreSeccion });

  return res.status(201).json({
    msg: "La seccion se añadió correctamente",
    seccion
  });

}

export async function actualizarSeccion(req: Request, res: Response) {

  const { nombreSeccion } = req.body;
  const { idSeccion } = req.params;

  await Seccion.update({ nombreSeccion }, {
    where: {
      idSeccion
    }
  });

  res.status(201).json({
    msg: "La seccion se actualizo correctamente",
  });

}


export async function eliminarSeccion(req: Request, res: Response) {

  const { idSeccion } = req.params;

  const seccion = await Seccion.findByPk(idSeccion, {
    attributes: [
      'nombreSeccion'
    ]
  });

  await Seccion.destroy({
    where: {
      idSeccion
    }
  });

  res.status(200).json({
    msg: `La seccion ${seccion!.nombreSeccion} se elimino correctamente`
  });

}



// Ruta para añadir una categoria
export async function aniadirCategoria(req: Request, res: Response) {

  const { nombreCategoria, idSeccion } = req.body;

  const categoria = await Categoria.create({ nombreCategoria, idSeccion });

  res.status(201).json({
    msg: `La categoria ${nombreCategoria} se creo correctamente`,
    categoria
  });

}


export async function actualizarCategoria(req: Request, res: Response) {


  const { idCategoria } = req.params;
  const { nombreCategoria, idSeccion } = req.body;


  await Categoria.update({
    nombreCategoria,
    idSeccion
  }, {
    where: {
      idCategoria
    }
  })

  res.status(201).json({
    msg: `La categoria ${nombreCategoria} se actualizo correctamente`
  });


}


export async function eliminarCategoria(req: Request, res: Response) {

  const { idCategoria } = req.params;

  const categoria = await Categoria.findByPk(idCategoria, {
    attributes: [
      'nombreCategoria'
    ]
  });

  await Categoria.destroy({
    where: {
      idCategoria
    }
  });

  res.status(200).json({
    msg: `La categoria ${categoria!.nombreCategoria} se elimino correctamente`
  });


}

// La goria en que se va a añadir debe estar en la ruta
export async function aniadirProducto(req: Request, res: Response) {

  let { nombre, descripcion, idCategoria, precio } = req.body;

  
  const producto = await Producto.create({
    nombre, precio, descripcion, idCategoria, cantidad: 0, linkFoto: ''
  });


  res.status(201).json({
    msg: "El producto se añadio correctamente",
    producto
  });

}


// Recibe también el id categoria
export async function actualizarProducto(req: Request, res: Response) {

  const { idProducto } = req.params;

  let { nombre, descripcion, idCategoria, precio } = req.body;

  precio = Number(precio);

   await Producto.update({
    nombre, precio, descripcion, idCategoria
  }, {
    where: {
      idProducto
    }
  });

  res.status(201).json({
    msg: `El producto ${nombre} ha sido eliminado`
  });

}

export async function eliminarProducto(req: Request, res: Response) {

  const { idProducto } = req.params;

  const producto = await Producto.findByPk(idProducto, {
    attributes: [
      'nombre'
    ]
  });

  await Producto.destroy({
    where: {
      idProducto
    }
  })

  res.status(200).json({
    msg: `El producto ${producto!.nombre} se elimino correctamente`
  });

}

