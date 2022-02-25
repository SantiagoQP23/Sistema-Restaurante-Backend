const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const Seccion = require('../models/seccion');

const crearAsociaciones = () => {
  console.log("Se realizaron las asociaciones");

  Seccion.hasMany(Categoria, { as: 'categorias', foreignKey: 'idSeccion' });
Categoria.belongsTo(Seccion, { as: 'seccion', foreignKey: 'idSeccion'});

  Categoria.hasMany(Producto, { as: 'productos', foreignKey: 'idCategoria' },);
  Producto.belongsTo(Categoria, { as: 'categoria', foreignKey: 'idCategoria' });
}


module.exports = crearAsociaciones;
