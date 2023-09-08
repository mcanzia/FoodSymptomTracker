import express from 'express';
import { ChartControllerImpl } from '../controllers/ChartControllerImpl';

const router = express.Router();
const chartController : ChartControllerImpl = new ChartControllerImpl();

router.get('/', chartController.getAllCharts);
router.get('/:chartId', chartController.getChartById);
router.post('/', chartController.addCharts);
router.put('/:chartId', chartController.updateChart);
router.delete('/', chartController.deleteCharts);
router.post('/average', chartController.createAverageChart);
router.post('/food-value', chartController.createFoodValueChart);
router.post('/single-value-component-weight-by-food', chartController.createSingleValueComponentWeightByFoodChart);
router.post('/multi-value-component-weight-by-food', chartController.createMultiValueComponentWeightByFoodChart);

export default router;

