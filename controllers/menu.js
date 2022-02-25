// Requerir modelos
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const { Sequelize } = require( 'sequelize');
const Seccion = require('../models/seccion');


// Devuelve las secciones, categorias de la primera seccion y los productos de la primera categoria
async function getMenu(req, res) {

  const secciones = await connection.query("SELECT nombreSeccion, idSeccion FROM secciones");


  const categorias = await connection.query("SELECT nombreCategoria, idCategoria FROM categorias");

  const productos = await connection.query("SELECT nombre, precio, descripcion, idCategoria FROM productos");
  // Recorrer categorias para obtener los produtos

  res.status(200).send({ secciones, categorias, productos });
}

async function getSecciones(req, res) {



 /*  let consulta = `select s.idSeccion, s.nombreSeccion, if(tab.cantidad is null, 0, tab.cantidad) as cantCategorias
  from secciones s
  left join (
    select 
      idSeccion, count(*) as cantidad 
          from categorias
          
          group by idSeccion
          ) as tab
          
          on s.idSeccion = tab.idSeccion ;`

  const secciones = await connection.query(consulta); */
    const secciones = await Seccion.findAll({
      include: {
       model: Categoria,
       as: 'categorias',
       attributes: ['nombreCategoria'] 
      }
    })


  res.status(200).json({ secciones });

}

async function getCategorias(req, res) {

  const categorias = await Categoria.findAll({
    include: {
      model: Producto,
      as: 'productos',
      attributes: [
      'nombre', ]
    },
  

  });

/*   let consultaBuena = `select c.idSeccion, c.idCategoria, c.nombreCategoria, if(tab.cantidad is null, 0, tab.cantidad) as cantProductos
          from categorias c
          left join (
            select 
            idCategoria, count(*) as cantidad 
            from productos
            
            group by idCategoria
            ) as tab
            on c.idCategoria = tab.idCategoria`;

  const categorias = await connection.query(consultaBuena);
 */

  res.status(200).json({ categorias });

}

async function getProductos(req, res) {

  const productos = await Producto.findAll();
  res.status(200).json({ productos});

}

module.exports = {
  getMenu,
  getSecciones,
  getCategorias,
  getProductos
}