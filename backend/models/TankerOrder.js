// backend/models/TankerOrder.js
import mongoose from "mongoose";
import { orderSchema } from "./orderSchema.js"; // Import the base schema

// Create a new schema by copying the base order schema
const tankerOrderSchema = orderSchema.clone();

tankerOrderSchema.add({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  volume: { type: Number, required: true }, // Liters
  truckType: { type: String },
  deliveryDate: { type: Date },
});

// Ensure timestamps are enabled for this schema
tankerOrderSchema.set('timestamps', true);

const TankerOrder = mongoose.model("TankerOrder", tankerOrderSchema);
export default TankerOrder;
