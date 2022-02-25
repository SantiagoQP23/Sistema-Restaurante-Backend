// Requeri modelos

const Seccion = require("../models/seccion");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");



const esSeccion = async(nombreSeccion = '') => {

  const seccion = await Seccion.findOne({
    where: {
      nombreSeccion
    }
  });

  if( seccion ){
    throw new Error(`La seccion ${nombreSeccion} ya existe`)
  }
}

const esCategoria = async(nombreCategoria = '') => {
  
  const categoria = await Categoria.findOne({
    where: {
      nombreCategoria
    }
  });

  if( categoria ){
    throw new Error(`La categoria ${nombreCategoria} ya existe`)
  }
}

const esProducto = async(nombre = '') => {
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

const esSeccionValida = async( idSeccion = '') => {

  const seccion = await Seccion.findByPk(idSeccion);

  if( !seccion ) {
    throw new Error(`La sección con el id ${idSeccion} no existe`);
  }


}

const esCategoriaValida = async( idCategoria = '') => {

  const categoria = await Categoria.findByPk(idCategoria);

  if( !categoria ) {
    throw new Error(`La categoria con el id ${idCategoria} no existe`);
  }


}

const esProductoValido = async( idProducto = '') => {

  const producto = await Producto.findByPk(idProducto);

  if( !producto ) {
    throw new Error(`El producto con el id ${idProducto} no existe`);
  }


}


module.exports = {
  esSeccion,
  esCategoria,
  esProducto,

  esSeccionValida,
  esCategoriaValida,
  esProductoValido
}