import mongoose from "mongoose";

const tankerOrderSchema = new mongoose.Schema(
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
    volume: { type: Number, required: true },
    truckType: { type: String },
    deliveryDate: { type: Date },
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

const TankerOrder = mongoose.model("TankerOrder", tankerOrderSchema);

export default TankerOrder;