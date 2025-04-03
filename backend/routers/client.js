import ClientController from "../controllers/ClientController.class.js";
import express from 'express';

const router = express.Router();
const controller = ClientController.getInstance();

router.get('/', (req, res, next)=>{
    controller.getAllClients(req, res).catch(((err) => Promise.reject(next())));
});

router.get('/:name/:idClient', (req, res, next)=>{
    controller.getClientById(req, res).catch(((err) => Promise.reject(next())));
});

router.post('/', (req, res, next)=>{
    controller.addClient(req, res).catch(((err) => Promise.reject(next())));
});

router.patch('/', (req, res, next)=>{
    controller.updateClient(req, res).catch(((err) => Promise.reject(next())));
});

router.delete('/:idClient', (req, res, next)=>{
    controller.deleteClient(req, res).catch(((err) => Promise.reject(next())));
});

export default router;