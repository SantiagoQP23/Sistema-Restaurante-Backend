const { DataTypes } = require('sequelize');
const db = require('../database/config');

/* 
{
  idUsuario,
  nombreUsuario
  nombres
  password
  idCargo
} */

const Usuario = db.define( 'Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombreUsuario: {
    type: DataTypes.STRING,
    unique: true
  },
  nombres: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  idCargo: {
    type: DataTypes.BOOLEAN
  }

})


module.exports = Usuario;