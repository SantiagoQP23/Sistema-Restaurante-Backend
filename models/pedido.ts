import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes} from "sequelize";
import db from "../database/config";


interface PedidoModel extends Model<InferAttributes<PedidoModel>, InferCreationAttributes<PedidoModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  idPedido: CreationOptional<number>;
  nombreCliente: string;
  total: number;
  estado: boolean;
  fecha: string;
  hora: string;
  idUsuario: number;
}

const Pedido = db.define<PedidoModel>('Pedidos', {
  idPedido: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCliente: {
    type: DataTypes.STRING,
    defaultValue: ""
  },
  total: {
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
    },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
})


export default Pedido;