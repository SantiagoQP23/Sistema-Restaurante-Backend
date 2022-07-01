"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const Pedido = config_1.default.define('Pedidos', {
    idPedido: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCliente: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: ""
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 0
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: 1
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    hora: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
exports.default = Pedido;
//# sourceMappingURL=pedido.js.map