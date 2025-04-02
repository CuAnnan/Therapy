import ClientController from "../controllers/ClientController.class.js";
import express from 'express';

const router = express.Router();
const controller = ClientController.getInstance();

router.get('/', (req, res, next)=>{
    controller.getAllClients(req, res).catch(next);
});

router.get('/:name/:idTherapist', (req, res, next)=>{
    controller.getClientById(req, res).catch(next);
});

router.post('/', (req, res, next)=>{
    controller.addClient(req, res).catch(next);
});

router.patch('/', (req, res, next)=>{
    controller.updateClient(req, res).catch(next);
});

router.delete('/:idTherapist', (req, res, next)=>{
    controller.deleteClient(req, res).catch(next);
});

export default router;