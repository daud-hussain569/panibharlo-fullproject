import asyncHandler from "express-async-handler";
import BottleOrder from "../models/BottleOrder.js";

// @desc   Get all bottle orders
// @route  GET /api/bottle-orders
// @access Admin / Super Admin
export const getBottleOrders = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const filter = userId ? { user: userId } : {};
  const orders = await BottleOrder.find(filter)
    .populate("user", "name email")
    .populate("deliverer", "name email")
    .populate("product", "name price");
  res.json(orders);
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await BottleOrder.find({ user: req.user._id })
    .populate("product", "name price")
    .populate("deliverer", "name email");

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
  const { product, quantity, address, contact, size, customerDetails } = req.body;

  if (!product || !quantity || !address) {
    res.status(400);
    throw new Error("Missing required fields: product, quantity, and address are required.");
  }

  // ✅ If contact not provided, fallback to user profile info
  let finalContact = contact || req.user.contact || req.user.phone || req.user.email;

  const order = new BottleOrder({
    user: req.user._id,
    product,
    size,
    quantity,
    customerDetails, // Store guest details if provided
    address,
    contact: finalContact,
  });

  const createdOrder = await order.save();

  // Emit socket event to the specific user's room and a global event
  const userId = req.user._id.toString();
  req.io.to(userId).emit("new_bottle_order", createdOrder);
  req.io.emit("new_bottle_order", createdOrder);

  console.log(`✅ Emitted new_bottle_order for user ${userId}`);

  res.status(201).json(createdOrder);
});

// @desc   Update bottle order status
// @route  PUT /api/bottle-orders/:id
// @access Admin / Super Admin / Deliverer
export const updateBottleOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error("Status is required for update.");
  }

  const updatedOrder = await BottleOrder.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate("user", "id name");

  if (updatedOrder) {
    res.json(updatedOrder);

    const userId = updatedOrder.user._id.toString();
    console.log(`✅ Emitting order_status_update to user room: ${userId}`);
    req.io.to(userId).emit("order_status_update", updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc   Assign a deliverer to a bottle order
// @route  PUT /api/bottle-orders/:id/assign
// @access Admin
export const assignDeliverer = asyncHandler(async (req, res) => {
  const { delivererId } = req.body;

  const updatedOrder = await BottleOrder.findByIdAndUpdate(
    req.params.id,
    {
      deliverer: delivererId,
      status: "assigned",
    },
    { new: true, runValidators: false } // Temporarily disable validators for this specific action
  )
    .populate("user", "name email")
    .populate("deliverer", "name email")
    .populate("product", "name");

  if (updatedOrder) {

    if (req.io && delivererId) {
      req.io.to(delivererId).emit("new_assigned_order", updatedOrder);
      console.log(`✅ Emitted new_assigned_order to deliverer room: ${delivererId}`);
    }

    res.json(updatedOrder); // Send back the fully populated and updated order
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
  if (order) {
    await order.deleteOne();
    res.json({ message: "Bottle Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc   Get bottle order by ID
// @route  GET /api/bottle-orders/:id
// @access Admin / Super Admin / User
export const getBottleOrderById = asyncHandler(async (req, res) => {
  const order = await BottleOrder.findById(req.params.id)
    .populate("user", "name email")
    .populate("deliverer", "name email")
    .populate("product", "name price");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
