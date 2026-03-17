const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function forceCreateAdmin() {
  const email = "this.pushpendra@gmail.com";
  const password = "Pushpendra4545";
  
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected.");

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Completely overwrite or create
    await User.findOneAndDelete({ email: email.toLowerCase().trim() });
    
    const admin = new User({
      name: "Admin Pushpendra",
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("✅ SUCCESS: Admin account created/reset.");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

forceCreateAdmin();
