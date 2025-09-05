import mongoose from "mongoose";
import { orderSchema } from "./orderSchema.js"; // Import the base schema

// Create a new schema by cloning the base order schema
const bottleOrderSchema = orderSchema.clone();

// Add fields specific to Bottle Orders
bottleOrderSchema.add({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  size: { type: String },
});

// Ensure timestamps are enabled for this schema
bottleOrderSchema.set("timestamps", true);

const BottleOrder = mongoose.model("BottleOrder", bottleOrderSchema);

export default BottleOrder;
