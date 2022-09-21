
import express, {Application} from 'express';
import cors from "cors";
import { createServer, Server } from "http";
import {Server as socketio} from 'socket.io';
import morgan from 'morgan';

import Sockets from './sockets';

import db from "../database/config";
import {crearAsociaciones} from '../database/associations';

import authRoutes from "../routes/auth";
import pedidosRoutes from "../routes/pedidos";
import menuRoutes from '../routes/menu';
import editarMenuRoutes from '../routes/editar-menu';

import { ClientToServerEvents, ServerToClientEvents } from '../interfaces/sockets';


 declare global {
  namespace Express {
    interface Request {
      uid: string
    }
  }
}

class MyServer {

  private app: Application;
  private port: string;
  private paths = {

    auth: '/api/auth',
    menu: '/api/menu',
    pedidos: '/api/pedidos',
    
  }
  private server: Server;
  private io: socketio;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';


    this.middlewares();
    this.conectarDB();
    
    
    this.server = createServer(this.app);
    this.io = new socketio<ServerToClientEvents, ClientToServerEvents>(this.server, {/* configuraciones */});
    
    
    this.routes();
  }


  async conectarDB() {

    try {

      await db.authenticate();
      console.log("database online");
      crearAsociaciones();
      
    } catch (error: any) {
      throw new Error( error );
    }


  }

  configurarSockets() {
    new Sockets( this.io );
  }



  middlewares() {
    // carpeta de recursos
    this.app.use( express.static( 'public' ));

    // Mostrar peticiones al servidor
    this.app.use( morgan('dev'));

    // cors
    this.app.use(cors());
    
    
    // Recibir json en las peticiones 
    this.app.use( express.json() );

    this.app.use( express.urlencoded( {extended: false}));
  }

  routes() {

    this.app.use( this.paths.auth, authRoutes);
    this.app.use( this.paths.menu, menuRoutes);
    this.app.use( this.paths.menu, editarMenuRoutes);
    this.app.use( this.paths.pedidos, pedidosRoutes);
    
  }


  listen() {
    this.configurarSockets();

    this.server.listen( this.port, () => {
      console.log(`Servidor en puerto ${this.port}`);
    })

  }


}

export default MyServer;