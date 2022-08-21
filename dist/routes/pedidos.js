"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const pedidos_1 = require("../controllers/pedidos");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.use(validar_jwt_1.validarJWT);
router.get("/?", pedidos_1.getPedidosPorFecha);
router.get("/detalles/pendientes", pedidos_1.getDetallesPendientes);
// CREAR PEDIDOS
router.post("/crear", pedidos_1.crearPedido);
router.get('/productos/dia/?', pedidos_1.getPedidosPorProducto);
router.get('/meseros/dia/?', pedidos_1.getPedidosPorMesero);
// Obtener un pedido por id
router.get("/:idPedido", (0, express_validator_1.check)('idPedido').custom(db_validators_1.esPedidoValido), validar_campos_1.validarCampos, pedidos_1.getPedido);
// ACTUALIZAR EL NOMBRE DEL CLIENTE
/* router.put("/editar/:idPedido/cliente",
  check('idPedido').custom(esPedidoValido),
  check('nombreCliente', 'El nombre del cliente es obligatorio').not().isEmpty(),
  validarCampos,
  actualizarNombreCliente
); */
// Cambiar estado a finalizado
/* router.put("/editar/:idPedido/estado",
  check('idPedido').custom(esPedidoValido),
  check('idPedido').custom(esPedidoEntregado),
  validarCampos,
  actualizarEstadoPedido);
 */
// Eliminar un pedido por su id
/* router.delete("/eliminar/:idPedido",
  check('idPedido').custom(esPedidoValido),
  check('idPedido').custom(esPedidoFinalizado),
  validarCampos,
  eliminarPedido
); */
// Crear detalle de pedido
/* router.post("/editar/:idPedido/detalles/crear",
  check('idPedido').custom(esPedidoValido),
  check('idProducto').custom(esProductoValido),
  check('cantidad', 'La cantidad del producto debe ser mayor a 0').isInt({ min: 1, max: 100 }),
  validarCampos,
  crearDetallePedido
); */
// Actualizar la cantidad del detalle
/* router.put("/editar/:idPedido/detalles/cantidad/:idDetalle",
  check('idPedido').custom(esPedidoValido),
  check('idPedido').custom(esPedidoFinalizado),
  check('idDetalle').custom(esDetallePedidoValido),
  validarCampos,
  actualizarCantidadDetalle);
 */
// ACTUALIZAR EL ESTADO DEL PEDIDO MEDIANTE CANTIDAD ENTREGADA
/* router.put("/pedidos/editar/:idPedido/detalles/estado/:idDetalle",
  check('idPedido').custom(esPedidoValido),
  check('idPedido').custom(esPedidoFinalizado),
  check('idDetalle').custom(esDetallePedidoValido),
  check('cantEntregada', 'La cantidad del producto debe ser mayor a 0').isInt({ min: 1, max: 100 }),
  validarCampos,
  actualizarEstadoDetalle); */
// ELIMINAR DETALLE DE PEDIDO
/* router.delete("/pedidos/editar/:idPedido/detalles/eliminar/:idDetalle",
  check('idPedido').custom(esPedidoValido),
  check('idPedido').custom(esPedidoFinalizado),
  check('idDetalle').custom(esDetallePedidoValido),

  validarCampos,
  eliminarDetallePedido
)
 */
exports.default = router;
//# sourceMappingURL=pedidos.js.map