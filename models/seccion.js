const { DataTypes } = require( 'sequelize');
const db = require('../database/config');

const Seccion = db.define('Secciones', {
  idSeccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreSeccion: {
    type: DataTypes.STRING,
    unique: true,
    
  },
}, {
  timestamps: false
})

module.exports = Seccion;