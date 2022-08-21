import { Request, Response } from "express";
import Categoria from "../models/categoria";
import Producto from "../models/producto";
import Seccion from "../models/seccion";


// Devuelve las secciones, categorias de la primera seccion y los productos de la primera categoria
/* export async function getMenu(req: Request, res: Response) {

  const secciones = await connection.query("SELECT nombreSeccion, idSeccion FROM secciones");


  const categorias = await connection.query("SELECT nombreCategoria, idCategoria FROM categorias");

  const productos = await connection.query("SELECT nombre, precio, descripcion, idCategoria FROM productos");
  // Recorrer categorias para obtener los produtos

  res.status(200).send({ secciones, categorias, productos });
} */

export async function getSecciones(req: Request, res: Response) {

  const secciones = await Seccion.findAll({
    where: {
      estado: true
    }
  });


  res.status(200).json({ secciones });

}

export async function getCategorias(req: Request, res: Response) {

  const categorias = await Categoria.findAll({
    where: {
      estado: true
    }
  });

  res.status(200).json({ categorias });

}

export async function getProductos(req: Request, res: Response) {

  const productos = await Producto.findAll({

    where: {
      estado: true
    }
  });
  res.status(200).json({ productos });

}

