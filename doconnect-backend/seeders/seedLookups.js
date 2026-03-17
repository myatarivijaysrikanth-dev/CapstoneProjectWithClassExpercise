const mongoose = require("mongoose");
const Role = require("../models/Role");
const Status = require("../models/Status");

const seedLookups = async () => {
  await Role.deleteMany({});
  await Role.insertMany([
    { roleId: 1, roleType: "user" },
    { roleId: 2, roleType: "admin" },
  ]);

  await Status.deleteMany({});
  await Status.insertMany([
    { statusId: 1, statusType: "approved" },
    { statusId: 2, statusType: "pending" },
    { statusId: 3, statusType: "rejected" },
  ]);

  console.log("Lookup tables seeded successfully");
  mongoose.disconnect();
};

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/doconnect")
  .then(seedLookups)
  .catch((err) => console.error(err));
