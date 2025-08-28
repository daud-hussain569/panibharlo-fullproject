// backend/models/BottleOrder.js
import mongoose from "mongoose";

const bottleOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliverer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["Pending","In Transit","Delivered"], default: "Pending" },
  address: String
}, { timestamps: true });

const BottleOrder = mongoose.model("BottleOrder", bottleOrderSchema);
export default BottleOrder;
