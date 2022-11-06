import express, { Router } from 'express';
import { ComponentController } from '../controllers/ComponentController';

const router = Router();
const componentController : ComponentController = new ComponentController();

router.use(express.json());

router.get('/', componentController.getAllComponents);
router.get('/:componentId', componentController.getComponentById);
router.post('/', componentController.addComponents);
router.put('/:componentId', componentController.updateComponent);

export default router;

