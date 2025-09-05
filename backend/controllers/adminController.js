import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import BottleOrder from "../models/BottleOrder.js";
import TankerOrder from "../models/TankerOrder.js";

// @desc    Get admin statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const bottleOrdersCount = await BottleOrder.countDocuments();
  const tankerOrdersCount = await TankerOrder.countDocuments();

  // Example: Monthly new users for the last 12 months
  const monthlyUsers = await User.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } }
  ]);

  // Example: Monthly bottle orders
  const monthlyBottleOrders = await BottleOrder.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } }
  ]);

    // Example: Monthly tanker orders
  const monthlyTankerOrders = await TankerOrder.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } }
  ]);


  res.json({ usersCount, bottleOrdersCount, tankerOrdersCount, monthlyUsers, monthlyBottleOrders, monthlyTankerOrders });
});

export { getAdminStats };