

export interface ICargo {
  idCargo: number,
  nombre: string,
  descripcion: string
}


export interface IUsuario {
  idUsuario: number,
  nombreUsuario: string,
  nombres: string,
  
  cargo: ICargo,
}

