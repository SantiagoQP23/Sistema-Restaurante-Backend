"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const Seccion = config_1.default.define('Secciones', {
    idSeccion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreSeccion: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
}, {
    timestamps: false
});
exports.default = Seccion;
//# sourceMappingURL=seccion.js.map