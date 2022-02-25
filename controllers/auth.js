
const bcryptjs = require('bcryptjs');


const { response, request } = require('express');

const { generarJWT } = require( '../helpers/generar-jwt')

const Usuario = require('../models/Usuario');




const login = async (req = request, res = response) => {

  const { nombreUsuario, password } = req.body;

  // Verificar si el nombr de usuario existe
  const usuario = await Usuario.findOne({
    where:
    {
      nombreUsuario
    }
  });
  
  console.log(usuario.dataValues);

  if (!usuario) {
    return res.status(400).json({
      msg: "No se encontro al usuario"
    })
  }

  // Verificar la constraseña 
  // Comparar con bcrypt

  const validPassword = bcryptjs.compareSync(password, usuario.password)

  if (!validPassword) {
    return res.status(400).json({
      msg: "La contraseña es incorrecta"
    })
  }

  // Generar el JWT

  
  const token = await generarJWT( usuario.idUsuario)
/*   console.log("Generando token para el usuario: " + user.idUsuario)

  const usuario = {
    idUsuario: user.idUsuario,
    nombreUsuario: user.nombreUsuario,
    nombres: user.nombres,
    idCargo: user.idCargo
  } */

  return res.json({ok: true, usuario, token})




  /* 
  try {
    
    const consulta = `Select idUsuario, nombreUsuario, nombres, password, idCargo 
    from usuarios where nombreUsuario = "${nombreUsuario}"`;

    

    const usuarios = await connection.query(consulta);

    const user = usuarios[0];





  } catch (error) {
    console.log(error)

    return res.status(500).json({
      msg: "Hable con el administrador"
    })
  } */

}


const revalidarToken = async (req, res = response) => {
  /* 
  
    const idUsuario = req.uid;
  
    const consulta = `Select idUsuario, nombreUsuario, nombres, idCargo 
    from usuarios where idUsuario = ${idUsuario}`;
  
    const usuarios = await connection.query(consulta);
  
    const usuario = usuarios[0];
  
    const token = await generarJWT( idUsuario )
  
    res.status(200).json({
      ok: true,
      usuario, 
      token 
    })
   */
}


module.exports = { login, revalidarToken }