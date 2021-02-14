import Server from "./classes/server";
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

// Body-Parser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() );

// Cros 
server.app.use( cors( { origin: true, credentials: true } ) );

// Rutas de Servicios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidores corriendo en el puerto ${ server.port }`);
});

