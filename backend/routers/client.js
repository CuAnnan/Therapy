import ClientController from "../controllers/ClientController.class.js";
import express from 'express';

const router = express.Router();
const controller = ClientController.getInstance();

router.get('/', async (req, res, next)=>{
    await controller.getAllClients(req, res);
});

router.get('/:name/:idClient', async (req, res, next)=>{
    await controller.getClientById(req, res);
});

router.post('/', async (req, res, next)=>{
    await controller.addClient(req, res);
});

router.patch('/', async (req, res, next)=>{
    await controller.updateClient(req, res);
});

router.get('/getIdsAndNames', async (req, res, next)=>{
   await controller.getClientIdsAndNames(req, res);
});

router.delete('/:idClient', async (req, res, next)=>{
    await controller.deleteClient(req, res);
});

export default router;