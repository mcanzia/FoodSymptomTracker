import express from 'express';
import { DateLogControllerImpl } from '../controllers/DateLogControllerImpl';

const router = express.Router();
const dateLogController : DateLogControllerImpl = new DateLogControllerImpl();

router.get('/', dateLogController.getAllDateLogs);
router.get('/:dateLogId', dateLogController.getDateLogById);
router.post('/', dateLogController.addDateLogs);
router.put('/:dateLogId', dateLogController.updateDateLog);
router.delete('/', dateLogController.deleteDateLogs);

export default router;

