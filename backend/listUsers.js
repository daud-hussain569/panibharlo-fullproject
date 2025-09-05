import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const users = await User.find().lean();
    console.log("Found users:", users.length);
    users.slice(0,10).forEach(u => console.log({ _id: u._id, email: u.email, role: u.role, hasPassword: !!u.password }));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();