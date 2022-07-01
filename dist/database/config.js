"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/* const database = {
  host: "localhost",
  user: "root",
  password: "santiago1234",
  database: "tienda"

}; */
const db = new sequelize_1.Sequelize('tienda', 'root', 'santiago1234', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});
exports.default = db;
//# sourceMappingURL=config.js.map