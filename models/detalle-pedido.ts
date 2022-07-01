import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../database/config";


interface DetallePedidoModel extends Model<InferAttributes<DetallePedidoModel>, InferCreationAttributes<DetallePedidoModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  idDetallePedido: CreationOptional<number>;
  cantidad: number;
  cantEntregada: number;
  subtotal: number;
  estado: boolean;
  hora: string;
  descripcion: string;
  idProducto: number;
  idPedido: number;
}

const DetallePedido = db.define<DetallePedidoModel>('Detalles_Pedidos', {
  idDetallePedido: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER
  },
  cantEntregada: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  subtotal: {
    type: DataTypes.DOUBLE
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  hora: {
    type: DataTypes.TIME
  },
  descripcion: {
    type: DataTypes.STRING,
    defaultValue: ""
  },

  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

}, {
  timestamps: false
})


export default DetallePedido;