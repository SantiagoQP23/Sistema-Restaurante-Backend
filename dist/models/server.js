"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const morgan_1 = __importDefault(require("morgan"));
const sockets_1 = __importDefault(require("./sockets"));
const config_1 = __importDefault(require("../database/config"));
const associations_1 = require("../database/associations");
const auth_1 = __importDefault(require("../routes/auth"));
const pedidos_1 = __importDefault(require("../routes/pedidos"));
const menu_1 = __importDefault(require("../routes/menu"));
const editar_menu_1 = __importDefault(require("../routes/editar-menu"));
class MyServer {
    constructor() {
        this.paths = {
            auth: '/api/auth',
            menu: '/api/menu',
            pedidos: '/api/pedidos',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.conectarDB();
        this.server = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, { /* configuraciones */});
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.default.authenticate();
                console.log("database online");
                (0, associations_1.crearAsociaciones)();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    configurarSockets() {
        new sockets_1.default(this.io);
    }
    middlewares() {
        // carpeta de recursos
        this.app.use(express_1.default.static('public'));
        // Mostrar peticiones al servidor
        this.app.use((0, morgan_1.default)('dev'));
        // cors
        this.app.use((0, cors_1.default)());
        // Recibir json en las peticiones 
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(this.paths.auth, auth_1.default);
        this.app.use(this.paths.menu, menu_1.default);
        this.app.use(this.paths.menu, editar_menu_1.default);
        this.app.use(this.paths.pedidos, pedidos_1.default);
    }
    listen() {
        this.configurarSockets();
        this.server.listen(this.port, () => {
            console.log(`Servidor en puerto ${this.port}`);
        });
    }
}
exports.default = MyServer;
//# sourceMappingURL=server.js.map