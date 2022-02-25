const { DataTypes } = require( 'sequelize');
const db = require('../database/config');

const Categoria = db.define('Categorias', {
  idCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCategoria: {
    type: DataTypes.STRING,
    unique: true, 
    allowNull: false
  },
  idSeccion: {
    type: DataTypes.INTEGER,

  },
  

}, {
  timestamps: false
})

module.exports = Categoria;