// backend/models/Testimonial.js
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
