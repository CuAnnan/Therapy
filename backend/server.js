import createError from 'http-errors';
import express from 'express';
import cors from 'cors';

import conf from './conf.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/**
 * These two come straight out of the express default app and are used to handle errors gracefully
 * instead of with a shut down
 */
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(conf.express.port, ()=>{
    console.log("Express hoisted");
});