import express from 'express';
import { FoodControllerImpl } from '../controllers/FoodControllerImpl';

const router = express.Router();
const foodController : FoodControllerImpl = new FoodControllerImpl();

router.get('/', foodController.getAllFoods);
router.get('/:foodId', foodController.getFoodById);
router.post('/', foodController.addFoods);
router.delete('/', foodController.deleteFoods);

export default router;

