import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import http from 'http';

import conf from './conf.js';

const port = conf.express.port;

import therapistRouter from './routers/therapist.js';
import clientRouter from './routers/client.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/therapists', therapistRouter);
app.use('/therapist', therapistRouter);
app.use('/clients', clientRouter);
app.use('/client', clientRouter);

app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on('error', (error)=>{
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
server.on('listening', ()=>{
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});