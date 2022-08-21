"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const Categoria = config_1.default.define('Categorias', {
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCategoria: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    idSeccion: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});
exports.default = Categoria;
//# sourceMappingURL=categoria.js.map