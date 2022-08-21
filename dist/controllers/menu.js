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
exports.getProductos = exports.getCategorias = exports.getSecciones = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const producto_1 = __importDefault(require("../models/producto"));
const seccion_1 = __importDefault(require("../models/seccion"));
// Devuelve las secciones, categorias de la primera seccion y los productos de la primera categoria
/* export async function getMenu(req: Request, res: Response) {

  const secciones = await connection.query("SELECT nombreSeccion, idSeccion FROM secciones");


  const categorias = await connection.query("SELECT nombreCategoria, idCategoria FROM categorias");

  const productos = await connection.query("SELECT nombre, precio, descripcion, idCategoria FROM productos");
  // Recorrer categorias para obtener los produtos

  res.status(200).send({ secciones, categorias, productos });
} */
function getSecciones(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secciones = yield seccion_1.default.findAll({
            where: {
                estado: true
            }
        });
        res.status(200).json({ secciones });
    });
}
exports.getSecciones = getSecciones;
function getCategorias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categorias = yield categoria_1.default.findAll({
            where: {
                estado: true
            }
        });
        res.status(200).json({ categorias });
    });
}
exports.getCategorias = getCategorias;
function getProductos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productos = yield producto_1.default.findAll({
            where: {
                estado: true
            }
        });
        res.status(200).json({ productos });
    });
}
exports.getProductos = getProductos;
//# sourceMappingURL=menu.js.map