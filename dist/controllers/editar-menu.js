"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.actualizarProducto = exports.aniadirProducto = exports.eliminarCategoria = exports.actualizarCategoria = exports.aniadirCategoria = exports.eliminarSeccion = exports.actualizarSeccion = exports.aniadirSeccion = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const producto_1 = __importDefault(require("../models/producto"));
const seccion_1 = __importDefault(require("../models/seccion"));
// Estado 200 para eliminar y obtener
// Estado 201 para crear y actualizar
function aniadirSeccion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombreSeccion } = req.body;
        const seccion = yield seccion_1.default.create({ nombreSeccion, estado: true });
        return res.status(201).json({
            msg: "La seccion se añadió correctamente",
            seccion
        });
    });
}
exports.aniadirSeccion = aniadirSeccion;
function actualizarSeccion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombreSeccion } = req.body;
        const { idSeccion } = req.params;
        yield seccion_1.default.update({ nombreSeccion }, {
            where: {
                idSeccion
            }
        });
        res.status(201).json({
            msg: "La seccion se actualizo correctamente",
        });
    });
}
exports.actualizarSeccion = actualizarSeccion;
function eliminarSeccion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idSeccion } = req.params;
        yield seccion_1.default.update({ estado: false }, {
            where: {
                idSeccion
            }
        });
        const seccion = yield seccion_1.default.findByPk(idSeccion, {
            attributes: [
                'nombreSeccion'
            ]
        });
        /*
      
      
        await Seccion.destroy({
          where: {
            idSeccion
          }
        }); */
        res.status(200).json({
            msg: `La seccion ${seccion.nombreSeccion} se elimino correctamente`
        });
    });
}
exports.eliminarSeccion = eliminarSeccion;
// Ruta para añadir una categoria
function aniadirCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombreCategoria, idSeccion } = req.body;
        const categoria = yield categoria_1.default.create({ nombreCategoria, idSeccion, estado: true });
        res.status(201).json({
            msg: `La categoria ${nombreCategoria} se creo correctamente`,
            categoria
        });
    });
}
exports.aniadirCategoria = aniadirCategoria;
function actualizarCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idCategoria } = req.params;
        const { nombreCategoria, idSeccion } = req.body;
        yield categoria_1.default.update({
            nombreCategoria,
            idSeccion
        }, {
            where: {
                idCategoria
            }
        });
        res.status(201).json({
            msg: `La categoria ${nombreCategoria} se actualizo correctamente`
        });
    });
}
exports.actualizarCategoria = actualizarCategoria;
function eliminarCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idCategoria } = req.params;
        yield categoria_1.default.update({ estado: false }, {
            where: {
                idCategoria
            }
        });
        const categoria = yield categoria_1.default.findByPk(idCategoria, {
            attributes: [
                'nombreCategoria'
            ]
        });
        /*   await Categoria.destroy({
            where: {
              idCategoria
            }
          });
         */
        res.status(200).json({
            msg: `La categoria ${categoria.nombreCategoria} se elimino correctamente`
        });
    });
}
exports.eliminarCategoria = eliminarCategoria;
// La goria en que se va a añadir debe estar en la ruta
function aniadirProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { nombre, descripcion, idCategoria, precio } = req.body;
        const producto = yield producto_1.default.create({
            nombre, precio, descripcion, idCategoria,
            cantidad: 0, linkFoto: '', estado: true
        });
        res.status(201).json({
            msg: "El producto se añadio correctamente",
            producto
        });
    });
}
exports.aniadirProducto = aniadirProducto;
// Recibe también el id categoria
function actualizarProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idProducto } = req.params;
        let { nombre, descripcion, idCategoria, precio } = req.body;
        precio = Number(precio);
        yield producto_1.default.update({
            nombre, precio, descripcion, idCategoria
        }, {
            where: {
                idProducto
            }
        });
        res.status(201).json({
            msg: `El producto ${nombre} ha sido eliminado`
        });
    });
}
exports.actualizarProducto = actualizarProducto;
function eliminarProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idProducto } = req.params;
        yield producto_1.default.update({
            estado: false
        }, {
            where: {
                idProducto
            }
        });
        const producto = yield producto_1.default.findByPk(idProducto, {
            attributes: [
                'nombre'
            ]
        });
        /*  await Producto.destroy({
           where: {
             idProducto
           }
         }) */
        res.status(200).json({
            msg: `El producto ${producto.nombre} se elimino correctamente`
        });
    });
}
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=editar-menu.js.map