import SessionController from "../controllers/SessionController.class.js";
import express from 'express';

const router = express.Router();
const controller = new SessionController();

router.get('/', (req, res, next)=>{
    controller.getAllSessions(req, res).catch((err) => Promise.reject(next()));
});

router.post('/', (req, res, next)=>{
    controller.addSession(req, res).catch((err) => Promise.reject(next()));
});

router.delete('/:idSession', (req, res, next)=>{
    controller.deleteSession(req, res).catch((err) => Promise.reject(next()));
});

router.patch("/", (req, res, next)=>{
    controller.updateSession(req, res).catch((err) => Promise.reject(next()));
});

export default router;