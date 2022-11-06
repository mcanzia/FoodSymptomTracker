import express from 'express';
import { FoodController } from '../controllers/FoodController';

const router = express.Router();
const foodController : FoodController = new FoodController();

router.get('/', foodController.getAllFoods);
router.get('/:foodId', foodController.getFoodById);
router.post('/', foodController.addFoods);

export default router;

