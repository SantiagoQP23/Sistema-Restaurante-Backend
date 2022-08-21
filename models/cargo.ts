import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../database/config";


interface CargoModel extends Model<InferAttributes<CargoModel>, InferCreationAttributes<CargoModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  idCargo: CreationOptional<number>;
  nombreCargo: string;
  estado: boolean;
}

const Cargo = db.define<CargoModel>('Cargo', {
  idCargo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombreCargo: {
    type: DataTypes.STRING,
    unique: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  }

}, {
  timestamps: false
});

export default Cargo;