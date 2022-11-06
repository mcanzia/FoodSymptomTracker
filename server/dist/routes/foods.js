"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FoodController_1 = require("../controllers/FoodController");
const router = express_1.default.Router();
const foodController = new FoodController_1.FoodController();
router.get('/', foodController.getAllFoods);
router.get('/:foodId', foodController.getFoodById);
router.post('/', foodController.addFoods);
exports.default = router;
