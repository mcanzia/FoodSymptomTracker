"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FoodControllerImpl_1 = require("../controllers/FoodControllerImpl");
const router = express_1.default.Router();
const foodController = new FoodControllerImpl_1.FoodControllerImpl();
router.get('/', foodController.getAllFoods);
router.get('/:foodId', foodController.getFoodById);
router.post('/', foodController.addFoods);
router.delete('/', foodController.deleteFoods);
exports.default = router;
