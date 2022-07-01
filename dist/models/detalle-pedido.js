"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const DetallePedido = config_1.default.define('Detalles_Pedidos', {
    idDetallePedido: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cantEntregada: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    subtotal: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    hora: {
        type: sequelize_1.DataTypes.TIME
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: ""
    },
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idPedido: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});
exports.default = DetallePedido;
//# sourceMappingURL=detalle-pedido.js.map