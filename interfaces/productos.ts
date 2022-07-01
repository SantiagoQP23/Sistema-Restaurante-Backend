



export interface ISeccion {
 idSeccion: number,
 nombreSeccion: string,

}


export interface ICategoria {
  idCategoria: number,
  nombreCategoria: string,
  idSeccion: number
}

export interface IProducto {
  idProducto: number,
  nombre: string,
  precio: number,
  fecha_venta: Date,
  cantidad: number,
  descripcion: string,
  linkFoto: string,
  idCategoria: number,
}