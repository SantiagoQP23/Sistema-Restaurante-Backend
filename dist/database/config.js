"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/* const database = {
  host: "localhost",
  user: "root",
  password: "santiago1234",
  database: "tienda"

}; */
const db = new sequelize_1.Sequelize('heroku_f231292cd946c3d', 'b72cca3e850eb1', '48e76602', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    logging: false
});
/* const db = new Sequelize( 'tienda', 'root', 'santiago1234', {
  host: 'localhost',
  dialect: 'mysql',

  logging: false
}); */
exports.default = db;
//# sourceMappingURL=config.js.map