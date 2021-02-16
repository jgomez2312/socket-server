import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO, { Socket } from 'socket.io';
import http, { createServer } from 'http';


export default class Server{

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    private httpServer: http.Server;
    public io: socketIO.Server;
    
    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = createServer(this.app);
        this.io = socketIO(this.httpServer);
        
        this.escucharSocket();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this());
    }

    private escucharSocket(){
        console.log('Escuchando conexiones');
        
        this.io.on('connection', (socket: Socket) => {
            console.log('Cliente conectado');
        });
    }

    start( callback: Function){
        
        this.httpServer.listen( this.port, callback());
    }
}