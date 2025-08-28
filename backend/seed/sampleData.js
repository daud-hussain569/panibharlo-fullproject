// backend/seed/sampleData.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import BottleOrder from "../models/BottleOrder.js";
import TankerOrder from "../models/TankerOrder.js";
import Testimonial from "../models/Testimonial.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await BottleOrder.deleteMany();
    await TankerOrder.deleteMany();
    await Testimonial.deleteMany();

    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "Admin123",
      role: "admin"
    });

    const deliverer = await User.create({
      name: "Deliverer",
      email: "deliverer@example.com",
      password: "Deliverer123",
      role: "deliverer"
    });

    const customer = await User.create({
      name: "Customer",
      email: "customer@example.com",
      password: "Customer123",
      role: "user"
    });

    const products = await Product.insertMany([
      { name: "Mineral Water Bottle 1L", description: "Fresh Water", price: 1.5, stock: 100 },
      { name: "Mineral Water Bottle 5L", description: "Fresh Water", price: 5, stock: 50 },
      { name: "Water Tanker 500L", description: "Clean Water", price: 200, stock: 10 }
    ]);

    await BottleOrder.create({
      user: customer._id,
      deliverer: deliverer._id,
      product: products[0]._id,
      quantity: 10,
      address: "123 Street, City"
    });

    await TankerOrder.create({
      user: customer._id,
      deliverer: deliverer._id,
      product: products[2]._id,
      volume: 500,
      address: "123 Street, City"
    });

    await Testimonial.create({
      name: "Happy Customer",
      message: "Great service!",
      rating: 5
    });

    console.log("Sample data created");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
