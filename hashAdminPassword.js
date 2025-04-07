const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');  // Ensure the path is correct

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  const email = "hafeez@gmail.com";  // Your admin email
  const hashedPassword = await bcrypt.hash("hafeez123", 10); // Hashing password

  await User.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

  console.log("Admin password updated with a hashed password!");
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
