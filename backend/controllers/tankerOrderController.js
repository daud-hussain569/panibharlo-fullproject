// backend/controllers/tankerOrderController.js
import asyncHandler from "express-async-handler";
import TankerOrder from "../models/TankerOrder.js";

// Similar CRUD as BottleOrder
export const getTankerOrders = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const filter = userId ? { user: userId } : {};
  const orders = await TankerOrder.find(filter)
    .populate("user", "name email")
    .populate("deliverer", "name email")
    .populate("product", "name price");
  res.json(orders);
});

// @desc   Get logged in user's tanker orders
// @route  GET /api/tanker-orders/my-orders
// @access Private
export const getUserTankerOrders = asyncHandler(async (req, res) => {
  const orders = await TankerOrder.find({ user: req.user._id })
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
  const { product, volume, address, contact, truckType, deliveryDate } = req.body;

  if (!product || !volume || !address) {
    res.status(400);
    throw new Error("Missing required fields: product, volume, and address are required.");
  }

  // Ensure the user ID is taken from the authenticated user, not the request body.
  // This is a critical security measure.
  const order = new TankerOrder({
    user: req.user._id,
    product,
    truckType,
    deliveryDate,
    volume,
    address,
    contact,
  });
  const createdOrder = await order.save();

  // Emit a socket event to the specific user's room and a global event for admins/deliverers
  const userId = req.user._id.toString();
  req.io.to(userId).emit("new_tanker_order", createdOrder); // For the specific user
  req.io.emit("new_tanker_order", createdOrder); // For all clients (admin/deliverer dashboards)

  console.log(`Emitted new_tanker_order for user ${userId}`);

  res.status(201).json(createdOrder);
});

export const updateTankerOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error("Status is required for update.");
  }

  const updatedOrder = await TankerOrder.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate("user", "id name");

  if (updatedOrder) {
    res.json(updatedOrder);

    // Emit socket event
    const userId = updatedOrder.user._id.toString();
    console.log(`Emitting order_status_update for tanker to user room: ${userId}`);
    req.io.to(userId).emit("order_status_update", updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc   Assign a deliverer to a tanker order
// @route  PUT /api/tanker-orders/:id/assign
// @access Admin
export const assignTankerDeliverer = asyncHandler(async (req, res) => {
  const { delivererId } = req.body;

  const updatedOrder = await TankerOrder.findByIdAndUpdate(
    req.params.id,
    {
      deliverer: delivererId,
      status: "assigned",
    },
    { new: true, runValidators: false }
  ).populate("user", "name email").populate("deliverer", "name email").populate("product", "name");


  if (updatedOrder) {

    // Notify the specific deliverer
    if (req.io && delivererId) {
      req.io.to(delivererId).emit("new_assigned_order", updatedOrder);
      console.log(`Emitted new_assigned_order to deliverer room: ${delivererId}`);
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const deleteTankerOrder = asyncHandler(async (req, res) => {
  const order = await TankerOrder.findById(req.params.id);
  if(order) {
    await order.deleteOne(); // This was already correct, ensuring consistency.
    res.json({ message: "Tanker Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const getTankerOrderById = asyncHandler(async (req, res) => {
  const order = await TankerOrder.findById(req.params.id)
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
