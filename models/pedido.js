const { DataTypes } = require( 'sequelize');
const db = require('../database/config');

const Seccion = db.define('Secciones', {
  idPedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCliente: {
    type: DataTypes.STRING
  },
  total: {
    type: DataTypes.DOUBLE
  },
  estado: {
    type: DataTypes.BOOLEAN
  },
  fecha: {
    type: DataTypes.DATE
  }
}, {
  timestamps: false
})


module.exports = Seccion;