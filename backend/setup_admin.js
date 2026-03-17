const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function setupAdmin() {
  const email = "this.pushpendra@gmail.com";
  const password = "Pushpendra4545";
  const name = "Pushpendra Admin";

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env file");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected successfully.");

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (user) {
      console.log(`User ${email} already exists. Updating to Admin and setting password...`);
      user.password = hashedPassword;
      user.role = "admin";
      user.name = name; // Ensure name is set
      await user.save();
      console.log("Admin account updated successfully.");
    } else {
      console.log(`Creating new Admin account for ${email}...`);
      user = new User({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: "admin",
      });
      await user.save();
      console.log("Admin account created successfully.");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (err) {
    console.error("❌ Error setting up admin:");
    console.error(err);
    process.exit(1);
  }
}

setupAdmin();
