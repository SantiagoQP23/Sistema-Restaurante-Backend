import Producto from '../models/producto';
import Categoria from '../models/categoria';
import Seccion from '../models/seccion';
import DetallePedido from '../models/detalle-pedido';
import Pedido from '../models/pedido';
import Cargo from '../models/cargo';
import Usuario from '../models/usuario';

export const crearAsociaciones = () => {

  // Las secciones tienen categorias y las categorias tiene una seccion
  Seccion.hasMany(Categoria, { as: 'categorias', foreignKey: 'idSeccion' });
  Categoria.belongsTo(Seccion, { as: 'seccion', foreignKey: 'idSeccion' });
  
  // Las categorias tienen productos y un producto tiene una categoria
  Categoria.hasMany(Producto, { as: 'productos', foreignKey: 'idCategoria' },);
  Producto.belongsTo(Categoria, { as: 'categoria', foreignKey: 'idCategoria' });


  // Un pedido tiene detalles y los detalles pertenecen a un pedido. 
  Pedido.hasMany(DetallePedido, { as: 'detalles', foreignKey: 'idPedido' })
  DetallePedido.belongsTo(Pedido, { as: 'pedido', foreignKey: 'idPedido' });
  
  // Un usuario tiene muchos pedidos y un pedido pertence a un usuario
  Usuario.hasMany(Pedido, {as: 'pedidos', foreignKey: 'idUsuario'});
  Pedido.belongsTo(Usuario, {as: 'usuario', foreignKey: 'idUsuario'});

  // Detalle tiene un producto
  DetallePedido.belongsTo(Producto, { as: 'producto', foreignKey: 'idProducto' });

  Cargo.hasMany(Usuario, { as: 'usuarios', foreignKey: 'idCargo'});
  Usuario.belongsTo(Cargo, {as: 'cargo', foreignKey: 'idCargo'});

}




