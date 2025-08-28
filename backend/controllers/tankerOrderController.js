// backend/controllers/tankerOrderController.js
import asyncHandler from "express-async-handler";
import TankerOrder from "../models/TankerOrder.js";

// Similar CRUD as BottleOrder
export const getTankerOrders = asyncHandler(async (req, res) => {
  const orders = await TankerOrder.find()
    .populate("user", "name email")
    .populate("deliverer", "name email")
    .populate("product", "name price");
  res.json(orders);
});

export const getDelivererTankerOrders = asyncHandler(async (req, res) => {
  const orders = await TankerOrder.find({ deliverer: req.user._id })
    .populate("user", "name email")
    .populate("product", "name price");
  res.json(orders);
});

export const createTankerOrder = asyncHandler(async (req, res) => {
  const { user, deliverer, product, volume, address } = req.body;
  const order = new TankerOrder({ user, deliverer, product, volume, address });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

export const updateTankerOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await TankerOrder.findById(req.params.id);
  if(order) {
    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const deleteTankerOrder = asyncHandler(async (req, res) => {
  const order = await TankerOrder.findById(req.params.id);
  if(order) {
    await order.remove();
    res.json({ message: "Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

