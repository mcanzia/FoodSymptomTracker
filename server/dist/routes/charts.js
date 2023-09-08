"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChartControllerImpl_1 = require("../controllers/ChartControllerImpl");
const router = express_1.default.Router();
const chartController = new ChartControllerImpl_1.ChartControllerImpl();
router.get('/', chartController.getAllCharts);
router.get('/:chartId', chartController.getChartById);
router.post('/', chartController.addCharts);
router.put('/:chartId', chartController.updateChart);
router.delete('/', chartController.deleteCharts);
router.post('/average', chartController.createAverageChart);
router.post('/food-value', chartController.createFoodValueChart);
router.post('/single-value-component-weight-by-food', chartController.createSingleValueComponentWeightByFoodChart);
router.post('/multi-value-component-weight-by-food', chartController.createMultiValueComponentWeightByFoodChart);
exports.default = router;
