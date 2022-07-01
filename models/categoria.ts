import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import db from "../database/config";


interface CategoriaModel extends Model<InferAttributes<CategoriaModel>, InferCreationAttributes<CategoriaModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  idCategoria: CreationOptional<number>;
  nombreCategoria: string;
  idSeccion: number;
}

const Categoria = db.define<CategoriaModel>('Categorias', {
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

export default Categoria;