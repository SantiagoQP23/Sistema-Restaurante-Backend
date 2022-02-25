
const { request, response } = require('express')
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

const validarJWT = async (req = request, res = response, next) =>  {
  const token = req.header('x-token');

  if( !token ) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })
  }

  try {
    
    const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

    const {uid} = payload;

    if( !uid ) {
      return res.status(401).json({
        msg: 'Token no valido - usuario no existe'
      })
    }

    // Obtener el usuario de la base de datos
    const usuario = Usuario.findByPk(uid);

    if ( !usuario ){
      return res.status(401).json({
        msg: 'Token no valido - usuario no existe'
      })
    }

    req.uid = uid;

    next();
    
  } catch (error) {

    console.log(error);
    return res.status(401).json({
      msg: 'Token no válido'
    })
  }

}


module.exports = {
  validarJWT
}