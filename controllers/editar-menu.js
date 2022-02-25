
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Seccion = require('../models/seccion');



// Estado 200 para eliminar y obtener
// Estado 201 para crear y actualizar



async function aniadirSeccion(req, res) {

  try {
    const { nombreSeccion } = req.body;

    const seccion = await Seccion.create({ nombreSeccion });

    return res.status(201).json({
      msg: "La seccion se añadió correctamente",
      seccion
    });

  } catch (error) {
    return res.status(400).json({
      msg: error.errors[0].message,
    })
  }

}

async function actualizarSeccion(req, res) {

  const { nombreSeccion } = req.body;
  const { idSeccion } = req.params;

  const resultado = await Seccion.update({ nombreSeccion }, {
    where: {
      idSeccion
    }
  });

  res.status(201).json({
    msg: "La seccion se actualizo correctamente",
  });

}


async function eliminarSeccion(req, res) {

  const { idSeccion } = req.params;

  const seccion = await Seccion.findByPk(idSeccion, {
    attributes: [
      'nombreSeccion'
    ]
  });

  await seccion.destroy();

  res.status(200).json({
    msg: `La seccion ${seccion.nombreSeccion} se elimino correctamente`
  });

}



// Ruta para añadir una categoria
async function aniadirCategoria(req, res) {

  console.log("Creando la categoria");

  const { nombreCategoria, idSeccion } = req.body;

  const categoria = await Categoria.create({ nombreCategoria, idSeccion });


  res.status(201).json({
    msg: `La categoria ${nombreCategoria} se creo correctamente`,
    categoria
  });

}


async function actualizarCategoria(req, res) {


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


async function eliminarCategoria(req, res) {

  const { idCategoria } = req.params;

  const categoria = await Categoria.findByPk(idCategoria, {
    attributes: [
      'nombreCategoria'
    ]
  });

  await categoria.destroy();

  res.status(200).json({
    msg: `La categoria ${categoria.nombreCategoria} se elimino correctamente`
  });


}

// La goria en que se va a añadir debe estar en la ruta
async function aniadirProducto(req, res) {

  let { nombre, descripcion, idCategoria, precio } = req.body;

  const producto = await Producto.create({
    nombre, precio, descripcion, idCategoria
  });


  console.log(producto);
  res.status(201).json({
    msg: "El producto se añadio correctamente",
    producto
  });




}


// Recibe también el id categoria
async function actualizarProducto(req, res) {

  const { idProducto } = req.params;

  let { nombre, descripcion, idCategoria, precio } = req.body;

  precio = Number(precio);

 const producto = await Producto.update({
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



async function eliminarProducto(req, res) {

  const { idProducto } = req.params;

  const producto = await Producto.findByPk(idProducto, {
    attributes: [
      'nombre'
    ]
  });

  producto.destroy();

  res.status(200).json({
    msg: `El producto ${producto.nombre} se elimino correctamente`
  });

}


module.exports = {
  aniadirSeccion,
  actualizarSeccion,
  eliminarSeccion,

  aniadirCategoria,
  actualizarCategoria,
  eliminarCategoria,

  aniadirProducto,
  actualizarProducto,
  eliminarProducto


}

