import express from 'express';
import { ChartController } from '../controllers/ChartController';

const router = express.Router();
const chartController : ChartController = new ChartController();

router.get('/', chartController.getAllCharts);
router.get('/:chartId', chartController.getChartById);
router.post('/', chartController.addCharts);
router.put('/:chartId', chartController.updateChart);
router.post('/average', chartController.createAverageChart);
router.post('/food-value', chartController.createFoodValueChart);
router.post('/component-weight-by-food', chartController.createComponentWeightByFoodChart);
router.post('/component-weight-by-all-food', chartController.createComponentWeightByAllFoodChart);

export default router;

