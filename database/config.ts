import { Sequelize } from 'sequelize';

/* const database = {
  host: "localhost", 
  user: "root",
  password: "santiago1234",
  database: "tienda"

}; */

const db = new Sequelize( 'tienda', 'root', 'santiago1234', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false
});

export default db;