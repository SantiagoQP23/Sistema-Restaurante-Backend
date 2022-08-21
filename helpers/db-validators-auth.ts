import Cargo from "../models/cargo"
import Usuario from "../models/usuario";


export const esCargoValido =async (idCargo: number) => {

  const cargo1 = await Cargo.findByPk(idCargo);

  if(!cargo1){
    throw new Error(`El cargo con el id ${idCargo} no existe`);
  }
}

export const esNombreUsuarioValido =async (nombreUsuario: string) => {
  
  const usuario = await Usuario.findOne({
    where: {nombreUsuario},
    attributes: ['nombreUsuario']
  })

  if( usuario ){
    throw new Error(`El usuario con el nombre de usuario ${nombreUsuario} ya existe`);
  }
}

