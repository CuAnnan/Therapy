import express from 'express';
import cors from 'cors';
import http from 'http';

import conf from './conf.js';

const port = conf.express.port;


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import therapistRouter from './routers/therapist.js';
import clientRouter from './routers/client.js';
import sessionRouter from './routers/session.js';

app.use('/therapists', therapistRouter);
app.use('/therapist', therapistRouter);
app.use('/clients', clientRouter);
app.use('/client', clientRouter);
app.use('/session', sessionRouter);
app.use('/sessions', sessionRouter);

app.get("/", (req, res)=>{
    res.json(req.body);
});

app.set("port", port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send("File not found")
});



// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(500).render('serverError');
});


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