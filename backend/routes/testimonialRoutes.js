// backend/routes/testimonialRoutes.js
import express from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/testimonialController.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET testimonials - public
router.get("/", getTestimonials);

// Protected routes - Admin / Super Admin
router.use(protect, restrictTo("admin","superadmin"));
router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
