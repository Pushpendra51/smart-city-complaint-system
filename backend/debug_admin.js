const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function checkAdmin() {
  const email = "this.pushpendra@gmail.com";
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected.");

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log("❌ Admin user NOT FOUND in database.");
    } else {
      console.log("✅ Admin user FOUND.");
      console.log("Email:", user.email);
      console.log("Role:", user.role);
      console.log("Has Password:", !!user.password);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Connection error:", err.message);
  }
}
checkAdmin();
