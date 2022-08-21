
import { Request, Response } from "express";
import { generarJWT } from "../helpers/generar-jwt";
import Cargo from "../models/cargo";
import Usuario from "../models/usuario";
import bcryptjs from "bcryptjs";




export const login = async (req: Request, res: Response) => {

  try {
    const { nombreUsuario, password } = req.body;

    // Verificar si el nombr de usuario existe
    const usuario = await Usuario.findOne({
      where: {
        nombreUsuario
      },
      attributes: [
        'password'
      ],
    });


    if (!usuario) {
      return res.status(400).json({
        msg: "No se encontro al usuario"
      })
    }


    // Obtener los datos del usuario que se van a enviar al frontend
    const user = await Usuario.findOne({
      where: {
        nombreUsuario
      },
      attributes: [
        'idUsuario', 'nombreUsuario', 'nombres'
      ],
      include: {
        model: Cargo,
        as: 'cargo',
        attributes: ['nombreCargo', 'idCargo']
      }
    });

    // Verificar la constraseña 
    // Comparar con bcrypt

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "La contraseña es incorrecta"
      })
    }

    // Generar el JWT

    const token = await generarJWT(`${user!.idUsuario}`);



    return res.json({ ok: true, usuario: user, token });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Hable con el administrador"
    })
  }
}

interface IRequest extends Request {
  uid: string
}


export const revalidarToken = async (req: IRequest, res: Response) => {
  console.log("Revalidando token")

  const idUsuario = req.uid;

  const usuario = await Usuario.findByPk(idUsuario, {
    attributes: [
      'idUsuario', 'nombreUsuario', 'nombres'
    ],
    include: {
      model: Cargo,
      as: 'cargo',
      attributes: ['nombreCargo', 'idCargo']
    }
  });

  const token = await generarJWT(idUsuario)

  res.status(200).json({
    ok: true,
    usuario,
    token
  })

}


export const crearUsuario = async (req: Request, res: Response) => {


  const {nombres, idCargo, nombreUsuario, password} = req.body;

  console.log("creando usuario", nombreUsuario)
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);

  await Usuario.create({
    nombres, idCargo, nombreUsuario, password: hash, online: false,
    estado: true
  });


  const usuario = await Usuario.findOne({
    where: {
      nombreUsuario
    },
    attributes: [
      'idUsuario', 'nombreUsuario', 'nombres',
    ],
    include: {
      model: Cargo,
      as: 'cargo',
      attributes: ['nombreCargo', 'idCargo']
    }

  });



  res.status(201).json({
    msg: 'El usuario fue creado correctamente',
    usuario
  });


}

export const getUsuarios = async (req: Request, res: Response) => {

  const usuarios = await Usuario.findAll({
    attributes: [
      'idUsuario', 'nombreUsuario', 'nombres', 'online'
    ],
    include: {
      model: Cargo,
      as: 'cargo',
      attributes: ['nombreCargo', 'idCargo']
    }

  });

  res.status(200).json({
    msg: 'La lista de usuarios se obtuvo correctamente',
    usuarios
  })
}