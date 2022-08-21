import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import db from "../database/config";


interface ProductoModel extends Model<InferAttributes<ProductoModel>, InferCreationAttributes<ProductoModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  idProducto: CreationOptional<number>;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  linkFoto: string;
  idCategoria: number;
  estado: boolean;
}

const Producto = db.define<ProductoModel>( 'Productos',{

  idProducto: {
    type: DataTypes.INTEGER.UNSIGNED,
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
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
  

}, {
  timestamps: false
})

export default Producto;
