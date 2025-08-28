// backend/models/TankerOrder.js
import mongoose from "mongoose";

const tankerOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliverer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  volume: { type: Number, required: true }, // Liters
  status: { type: String, enum: ["Pending","In Transit","Delivered"], default: "Pending" },
  address: String
}, { timestamps: true });

const TankerOrder = mongoose.model("TankerOrder", tankerOrderSchema);
export default TankerOrder;
