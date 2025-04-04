import SessionController from "../controllers/SessionController.class.js";
import express from 'express';

const router = express.Router();
const controller = new SessionController();

router.get('/', async (req, res, next)=>{
    await controller.getAllSessions(req, res);
});

router.post('/', async (req, res, next)=>{
    await controller.addSession(req, res);
});

router.delete('/:idSession', async (req, res, next)=>{
    await controller.deleteSession(req, res);
});

router.patch("/",async (req, res, next)=>{
    await controller.updateSession(req, res);
});

export default router;