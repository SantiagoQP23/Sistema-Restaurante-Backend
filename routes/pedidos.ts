import { Router } from "express";
import { check } from "express-validator";


import {
  getPedidosPorFecha, crearPedido, getPedido,
  actualizarNombreCliente, actualizarEstadoPedido,
  eliminarPedido, getDetallesPendientes, getPedidosPorMesero, getPedidosPorProducto
} from '../controllers/pedidos';


import {
  esPedidoValido, esPedidoFinalizado,
  esPedidoEntregado, esProductoValido,
  esDetallePedidoValido
} from '../helpers/db-validators';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.use(validarJWT);

router.get("/?",
  getPedidosPorFecha);

router.get("/detalles/pendientes",
  getDetallesPendientes
)

// CREAR PEDIDOS
router.post("/crear",
  crearPedido
);
router.get('/productos/dia/?',
  getPedidosPorProducto
)

router.get('/meseros/dia/?',
  getPedidosPorMesero
);



// Obtener un pedido por id
router.get("/:idPedido",
  check('idPedido').custom(esPedidoValido),
  validarCampos,
  getPedido
);

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





export default router;

