// backend/controllers/contactController.js
import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.js";

// @desc    Create a new contact submission
// @route   POST /api/contact
// @access  Public
export const createContactSubmission = asyncHandler(async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  const submission = await Contact.create({ name, email, subject, message, phone });

  if (submission) {
    res.status(201).json(submission);
  } else {
    res.status(400);
    throw new Error("Invalid contact data");
  }
});

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Admin
export const getContactSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Contact.find({}).sort({ createdAt: -1 });
  res.json(submissions);
});