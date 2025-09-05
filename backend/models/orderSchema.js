import mongoose from "mongoose";

// Status Enum
export const orderStatusEnum = [
  "pending",
  "assigned",
  "dispatched",
  "in_transit",
  "delivered",
  "cancelled",
];

// Base Order Schema
export const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: { type: String, required: true },
    contact: { type: String, required: false }, // Optional now
    status: {
      type: String,
      required: true,
      enum: orderStatusEnum,
      default: "pending",
    },
    deliverer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
