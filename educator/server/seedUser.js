const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust path if needed

const MONGO_URI = "mongodb://localhost:27017/educatorDB";

async function seed() {
  await mongoose.connect(MONGO_URI);

  const users = [
    { name: "Ahmed Ali", email: "ahmed.ali@example.com", password: "password1", role: "educator" },
    { name: "Fatima Hassan", email: "fatima.hassan@example.com", password: "password2", role: "educator" },
    { name: "Omar Khalid", email: "omar.khalid@example.com", password: "password3", role: "student" },
    { name: "Aisha Noor", email: "aisha.noor@example.com", password: "password4", role: "student" },
    { name: "Yusuf Ibrahim", email: "yusuf.ibrahim@example.com", password: "adminpassword", role: "admin" }
  ];

  for (const userData of users) {
    const existing = await User.findOne({ email: userData.email });
    if (!existing) {
      const hashed = bcrypt.hashSync(userData.password, 10);
      const user = new User({ ...userData, password: hashed });
      await user.save();
      console.log(`User ${userData.email} created.`);
    } else {
      console.log(`User ${userData.email} already exists.`);
    }
  }

  mongoose.disconnect();
}

seed().catch(console.error);
