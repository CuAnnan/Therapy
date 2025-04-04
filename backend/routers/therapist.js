import TherapistController from "../controllers/TherapistController.class.js";
import express from 'express';

const router = express.Router();
const controller = TherapistController.getInstance();

router.get('/', async (req, res, next)=>{
   await controller.getAllTherapists(req, res);
});

router.get('/:name/:idTherapist', async (req, res, next)=>{
   await controller.getTherapistById(req, res);
});

router.post('/', async (req, res, next)=>{
   await controller.addTherapist(req, res);
});

router.patch('/', async (req, res, next)=>{
   await controller.updateTherapist(req, res);
});

router.delete('/:idTherapist', async (req, res, next)=>{
   await controller.deleteTherapist(req, res);
});

export default router;
