"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
const Cargo = config_1.default.define('Cargo', {
    idCargo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCargo: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    }
});
exports.default = Cargo;
//# sourceMappingURL=cargo.js.map