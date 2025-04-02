import TherapistController from "../controllers/TherapistController.class.js";
import express from 'express';

const router = express.Router();
const controller = TherapistController.getInstance();

router.get('/', (req, res, next)=>{
   controller.getAllTherapists(req, res).catch(next);
});

router.get('/:name/:idTherapist', (req, res, next)=>{
   controller.getTherapistById(req, res).catch(next);
});

router.post('/', (req, res, next)=>{
   controller.addTherapist(req, res).catch(next);
});

router.patch('/', (req, res, next)=>{
   controller.updateTherapist(req, res).catch(next);
});

router.delete('/:idTherapist', (req, res, next)=>{
   controller.deleteTherapist(req, res).catch(next);
});

export default router;
