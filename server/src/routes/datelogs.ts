import express from 'express';
import { DateLogController } from '../controllers/DateLogController';

const router = express.Router();
const dateLogController : DateLogController = new DateLogController();

router.get('/', dateLogController.getAllDateLogs);
router.get('/:dateLogId', dateLogController.getDateLogById);
router.post('/', dateLogController.addDateLogs);
router.put('/:dateLogId', dateLogController.updateDateLog);

export default router;

