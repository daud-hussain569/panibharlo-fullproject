// backend/routes/contactRoutes.js (This file was empty)
import express from 'express';
import {
  createContactSubmission,
  getContactSubmissions,
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createContactSubmission).get(protect, admin, getContactSubmissions);

export default router;
