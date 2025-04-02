import createError from 'http-errors';
import express from 'express';
import cors from 'cors';

import conf from './conf.js';

import therapistRouter from './routers/therapist.js';
import clientRouter from './routers/client.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/therapists', therapistRouter);
app.use('/client', clientRouter);

app.listen(conf.express.port, ()=>{
    console.log("Express hoisted");
});