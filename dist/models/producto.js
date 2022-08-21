"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const Producto = config_1.default.define('Productos', {
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: ""
    },
    linkFoto: sequelize_1.DataTypes.STRING,
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map