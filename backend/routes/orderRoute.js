import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();
import { addOrderItems, getMyOrder, getOrderById, updateOrderToPaid } from '../controllers/orderContoller.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/pay').put(protect, getMyOrder)
export default router