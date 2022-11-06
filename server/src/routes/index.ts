import express from 'express';
import foodRoutes from './foods';
import dateLogRoutes from './datelogs';
import componentRoutes from './components';
import chartRoutes from './charts';

const router = express.Router();

router.use(express.json());

router.use('/foods', foodRoutes);
router.use('/datelogs', dateLogRoutes);
router.use('/components', componentRoutes);
router.use('/charts', chartRoutes);

export default router;


