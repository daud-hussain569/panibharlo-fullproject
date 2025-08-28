// backend/routes/tankerOrderRoutes.js
import express from "express";
import {
  getTankerOrders,
  getDelivererTankerOrders,
  createTankerOrder,
  updateTankerOrder,
  deleteTankerOrder
} from "../controllers/tankerOrderController.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes
router.use(protect);

// Admin / Super Admin routes
router.get("/", restrictTo("admin","superadmin"), getTankerOrders);
router.post("/", restrictTo("admin","superadmin","user"), createTankerOrder);
router.put("/:id", restrictTo("admin","superadmin","deliverer"), updateTankerOrder);
router.delete("/:id", restrictTo("admin","superadmin"), deleteTankerOrder);

// Deliverer route
router.get("/deliverer", restrictTo("deliverer"), getDelivererTankerOrders);

export default router;
