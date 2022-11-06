"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChartController_1 = require("../controllers/ChartController");
const router = express_1.default.Router();
const chartController = new ChartController_1.ChartController();
router.get('/', chartController.getAllCharts);
router.get('/:chartId', chartController.getChartById);
router.post('/', chartController.addCharts);
router.put('/:chartId', chartController.updateChart);
router.post('/average', chartController.createAverageChart);
router.post('/food-value', chartController.createFoodValueChart);
router.post('/component-weight-by-food', chartController.createComponentWeightByFoodChart);
router.post('/component-weight-by-all-food', chartController.createComponentWeightByAllFoodChart);
exports.default = router;
