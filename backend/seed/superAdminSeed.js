// backend/seed/superAdminSeed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();
connectDB();

const seedSuperAdmin = async () => {
  try {
    const superAdminExists = await User.findOne({ role: "superadmin" });
    if(superAdminExists) {
      console.log("Super Admin already exists");
      process.exit();
    }

    const superAdmin = await User.create({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: "SuperAdmin123",
      role: "superadmin"
    });

    console.log("Super Admin created:", superAdmin.email);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedSuperAdmin();
