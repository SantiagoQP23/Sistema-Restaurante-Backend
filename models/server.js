const express = require('express');
const morgan = require('morgan');

const db = require('../database/config');
const crearAsociaciones = require('../database/associations');

class Server {


  constructor() {
    this.app = express();
    this.port = process.env.PORT;


    this.paths = {
      auth: '/api/auth',
      menu: '/api/menu',
      
    }



    this.middlewares();
    this.conectarDB();
    
    this.routes();
  
  
  }


  async conectarDB() {

    try {

      await db.authenticate();
      console.log("database online");
      crearAsociaciones();
      
    } catch (error) {
      throw new Error( error );
    }

  }


  middlewares() {
    // carpeta de recursos
    this.app.use( express.static( 'public' ));

    // Mostrar peticiones al servidor
    this.app.use( morgan('dev'));
    
    // Recibir json en las peticiones 
    this.app.use( express.json() );
    this.app.use( express.urlencoded( {extended: false}));
  }

  routes() {

    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.menu, require('../routes/menu'));
    this.app.use( this.paths.menu, require('../routes/editar-menu'));
    
  }


  listen() {
    this.app.listen( this.port, () => {
      console.log(`Servidor en puerto ${this.port}`);
    })

  }


}

module.exports = Server;