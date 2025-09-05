import mongoose from "mongoose";

const bottleOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: { type: Number, required: true },
    size: { type: String },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "assigned", "dispatched", "in_transit", "delivered", "cancelled"],
      default: "pending",
    },
    deliverer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const BottleOrder = mongoose.model("BottleOrder", bottleOrderSchema);

export default BottleOrder;