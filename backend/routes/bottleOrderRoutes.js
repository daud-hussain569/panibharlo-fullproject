// backend/routes/bottleOrderRoutes.js
import express from "express";
import {
  getBottleOrders,
  getDelivererOrders,
  createBottleOrder,
  updateBottleOrder,
  deleteBottleOrder
} from "../controllers/bottleOrderController.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes
router.use(protect);

// Admin / Super Admin routes
router.get("/", restrictTo("admin","superadmin"), getBottleOrders);
router.post("/", restrictTo("admin","superadmin","user"), createBottleOrder);
router.put("/:id", restrictTo("admin","superadmin","deliverer"), updateBottleOrder);
router.delete("/:id", restrictTo("admin","superadmin"), deleteBottleOrder);

// Deliverer route
router.get("/deliverer", restrictTo("deliverer"), getDelivererOrders);

export default router;
