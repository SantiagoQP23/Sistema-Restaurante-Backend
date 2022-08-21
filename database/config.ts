import { Sequelize } from 'sequelize';

/* const database = {
  host: "localhost", 
  user: "root",
  password: "santiago1234",
  database: "tienda"

}; */

const db = new Sequelize( 'heroku_f231292cd946c3d', 'b72cca3e850eb1', '48e76602', {
  host: 'us-cdbr-east-06.cleardb.net',
  dialect: 'mysql',

  logging: false
});

/* const db = new Sequelize( 'tienda', 'root', 'santiago1234', {
  host: 'localhost',
  dialect: 'mysql',

  logging: false
}); */

export default db;