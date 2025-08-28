// backend/controllers/bottleOrderController.js
import asyncHandler from "express-async-handler";
import BottleOrder from "../models/BottleOrder.js";

// @desc   Get all bottle orders
// @route  GET /api/bottle-orders
// @access Admin / Super Admin
export const getBottleOrders = asyncHandler(async (req, res) => {
  const orders = await BottleOrder.find()
    .populate("user", "name email")
    .populate("deliverer", "name email")
    .populate("product", "name price");
  res.json(orders);
});

// @desc   Get orders assigned to deliverer
// @route  GET /api/bottle-orders/deliverer
// @access Deliverer
export const getDelivererOrders = asyncHandler(async (req, res) => {
  const orders = await BottleOrder.find({ deliverer: req.user._id })
    .populate("user", "name email")
    .populate("product", "name price");
  res.json(orders);
});

// @desc   Create new bottle order
// @route  POST /api/bottle-orders
// @access Admin / Super Admin / User
export const createBottleOrder = asyncHandler(async (req, res) => {
  const { user, deliverer, product, quantity, address } = req.body;

  const order = new BottleOrder({ user, deliverer, product, quantity, address });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc   Update bottle order status
// @route  PUT /api/bottle-orders/:id
// @access Admin / Super Admin / Deliverer
export const updateBottleOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await BottleOrder.findById(req.params.id);

  if(order) {
    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc   Delete bottle order
// @route  DELETE /api/bottle-orders/:id
// @access Admin / Super Admin
export const deleteBottleOrder = asyncHandler(async (req, res) => {
  const order = await BottleOrder.findById(req.params.id);
  if(order) {
    await order.remove();
    res.json({ message: "Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
