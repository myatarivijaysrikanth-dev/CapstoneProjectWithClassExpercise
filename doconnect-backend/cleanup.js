const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany({ email: { $in: ['testuser@test.com', 'testadmin@test.com'] } });
  console.log('Done! Test users deleted');
  mongoose.disconnect();
});