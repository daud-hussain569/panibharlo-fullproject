// backend/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes and restrict to admin/superadmin
router.use(protect);
router.use(restrictTo("admin","superadmin"));

// GET /api/products - get all products
router.get("/", getProducts);

// GET /api/products/:id - get single product
router.get("/:id", getProductById);

// POST /api/products - create product
router.post("/", createProduct);

// PUT /api/products/:id - update product
router.put("/:id", updateProduct);

// DELETE /api/products/:id - delete product
router.delete("/:id", deleteProduct);

export default router;
