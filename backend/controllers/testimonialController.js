// backend/controllers/testimonialController.js
import asyncHandler from "express-async-handler";
import Testimonial from "../models/Testimonial.js";

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, message, rating } = req.body;
  const testimonial = new Testimonial({ name, message, rating });
  const created = await testimonial.save();
  res.status(201).json(created);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const { name, message, rating } = req.body;
  const testimonial = await Testimonial.findById(req.params.id);
  if(testimonial) {
    testimonial.name = name || testimonial.name;
    testimonial.message = message || testimonial.message;
    testimonial.rating = rating || testimonial.rating;
    const updated = await testimonial.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error("Testimonial not found");
  }
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if(testimonial) {
    await testimonial.deleteOne();
    res.json({ message: "Testimonial removed" });
  } else {
    res.status(404);
    throw new Error("Testimonial not found");
  }
});
