import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import db from "../database/config";


interface UsuarioModel extends Model<InferAttributes<UsuarioModel>, InferCreationAttributes<UsuarioModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  idUsuario: CreationOptional<number>;
  nombreUsuario: string;
  nombres: string;
  password: string;
  idCargo: number;
  online: boolean;
  estado: boolean;
}


const Usuario = db.define<UsuarioModel>( 'Usuario', {
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
  },
  online: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true
  }

});


export default Usuario;