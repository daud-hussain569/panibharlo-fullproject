import express from 'express';
const router = express.Router();
import {
  getBottleOrders,
  createBottleOrder,
  getBottleOrderById,
  updateBottleOrder,
  deleteBottleOrder,
  getUserOrders,
  getDelivererOrders,
  assignDeliverer,
} from '../controllers/bottleOrderController.js';
import { protect, admin, deliverer } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getBottleOrders).post(protect, createBottleOrder);

// User-specific route - MUST be before dynamic /:id
router.route('/my-orders').get(protect, getUserOrders);

// Deliverer-specific route
router.route('/deliverer').get(protect, deliverer, getDelivererOrders);

// Assign deliverer route
router.route('/:id/assign').put(protect, admin, assignDeliverer);

router
  .route('/:id')
  .get(protect, getBottleOrderById)
  .put(protect, deliverer, updateBottleOrder)
  .delete(protect, admin, deleteBottleOrder);

export default router;