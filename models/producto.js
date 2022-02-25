const { DataTypes } = require('sequelize');
const db = require('../database/config');




const Producto = db.define( 'Productos',{

  idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      min: 0,
   
    }
  },
  
  cantidad: {
    type: DataTypes.INTEGER
  },
  descripcion: {
    type: DataTypes.STRING,
    defaultValue: ""
  },
  linkFoto: DataTypes.STRING,

  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  

}, {
  timestamps: false
})

module.exports = Producto;
