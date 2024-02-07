import express, { Router } from 'express';
import { ComponentControllerImpl } from '../controllers/ComponentControllerImpl';

const router = Router();
const componentController : ComponentControllerImpl = new ComponentControllerImpl();

router.use(express.json());

router.get('/', componentController.getAllComponents);
router.get('/:componentId', componentController.getComponentById);
router.post('/', componentController.addComponents);
router.post('/newUser', componentController.addNewUserComponents);
router.put('/:componentId', componentController.updateComponent);
router.delete('/', componentController.deleteComponents);

export default router;

