import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import db from "../database/config";


interface SeccionModel extends Model<InferAttributes<SeccionModel>, InferCreationAttributes<SeccionModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  idSeccion: CreationOptional<number>;
  nombreSeccion: string;
}

const Seccion = db.define<SeccionModel>('Secciones', {
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

export default Seccion;