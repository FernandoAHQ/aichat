

const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const socketio = require('socket.io');
const Sockets = require('./sockets');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.app.set('var', 'correct battery horse staples');
        // Conectar a db
        dbConnection();

        // Http server
        this.server = http.createServer( this.app );

        // Configuraciones de sockets
        this.io = socketio( this.server, {/* configuraciones */} );
        
        

    }


    middlewares(sockets) {




        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( fileUpload() );
        
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        
        this.app.use((req, res, next) => {
            req.io = sockets;
            return next();
          });
       
        this.app.use( '/api/auth', require('../routes/auth.routes'));
        this.app.use( '/api/ai', require('../routes/openai.routes') );
        this.app.use( '/api/chat', require('../routes/chat.routes') );
       
 //       this.app.use( '/api/location', require('../routes/location.routes'));
 //       this.app.use( '/api/date', require('../routes/date.routes'));
 //       this.app.use( '/api/checador', require('../routes/checador.routes'));
    }


    configSockets() {
        return new Sockets( this.io );
    }


    execute() {



        // Inicializar Middlewares
        this.middlewares(this.configSockets());

        

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port );
        })


    }


}


module.exports = Server;