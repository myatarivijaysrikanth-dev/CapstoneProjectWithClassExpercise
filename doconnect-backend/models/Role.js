const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    roleId: {
      type: Number,
      required: true,
      unique: true,
      enum: [1, 2],
    },
    roleType: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Role', roleSchema);
