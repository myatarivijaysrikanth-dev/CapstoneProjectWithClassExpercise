const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
  {
    statusId: {
      type: Number,
      required: true,
      unique: true,
      enum: [1, 2, 3],
    },
    statusType: {
      type: String,
      required: true,
      enum: ['approved', 'pending', 'rejected'],
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Status', statusSchema);
