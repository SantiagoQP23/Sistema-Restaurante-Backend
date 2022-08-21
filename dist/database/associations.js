"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearAsociaciones = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
const seccion_1 = __importDefault(require("../models/seccion"));
const detalle_pedido_1 = __importDefault(require("../models/detalle-pedido"));
const pedido_1 = __importDefault(require("../models/pedido"));
const cargo_1 = __importDefault(require("../models/cargo"));
const usuario_1 = __importDefault(require("../models/usuario"));
const crearAsociaciones = () => {
    // Las secciones tienen categorias y las categorias tiene una seccion
    seccion_1.default.hasMany(categoria_1.default, { as: 'categorias', foreignKey: 'idSeccion' });
    categoria_1.default.belongsTo(seccion_1.default, { as: 'seccion', foreignKey: 'idSeccion' });
    // Las categorias tienen productos y un producto tiene una categoria
    categoria_1.default.hasMany(producto_1.default, { as: 'productos', foreignKey: 'idCategoria' });
    producto_1.default.belongsTo(categoria_1.default, { as: 'categoria', foreignKey: 'idCategoria' });
    // Un pedido tiene detalles y los detalles pertenecen a un pedido. 
    pedido_1.default.hasMany(detalle_pedido_1.default, { as: 'detalles', foreignKey: 'idPedido' });
    detalle_pedido_1.default.belongsTo(pedido_1.default, { as: 'pedido', foreignKey: 'idPedido' });
    // Un usuario tiene muchos pedidos y un pedido pertence a un usuario
    usuario_1.default.hasMany(pedido_1.default, { as: 'pedidos', foreignKey: 'idUsuario' });
    pedido_1.default.belongsTo(usuario_1.default, { as: 'usuario', foreignKey: 'idUsuario' });
    // Detalle tiene un producto
    producto_1.default.hasMany(detalle_pedido_1.default, { as: 'detalles', foreignKey: 'idProducto' });
    detalle_pedido_1.default.belongsTo(producto_1.default, { as: 'producto', foreignKey: 'idProducto' });
    cargo_1.default.hasMany(usuario_1.default, { as: 'usuarios', foreignKey: 'idCargo' });
    usuario_1.default.belongsTo(cargo_1.default, { as: 'cargo', foreignKey: 'idCargo' });
};
exports.crearAsociaciones = crearAsociaciones;
//# sourceMappingURL=associations.js.map