import express from 'express';
const router = express.Router();
import {
  getTankerOrders,
  createTankerOrder,
  getTankerOrderById,
  updateTankerOrder,
  deleteTankerOrder,
  getUserTankerOrders,
  getDelivererTankerOrders,
  assignTankerDeliverer, // Corrected to import the tanker-specific function
} from '../controllers/tankerOrderController.js';
import { protect, admin, deliverer } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getTankerOrders).post(protect, createTankerOrder);

// User-specific route - MUST be before dynamic /:id
router.route('/my-orders').get(protect, getUserTankerOrders);

router.route('/deliverer').get(protect, deliverer, getDelivererTankerOrders);

// Assign deliverer route
router.route('/:id/assign').put(protect, admin, assignTankerDeliverer);

router
  .route('/:id')
  .get(protect, getTankerOrderById)
  .put(protect, deliverer, updateTankerOrder)
  .delete(protect, admin, deleteTankerOrder);

export default router;