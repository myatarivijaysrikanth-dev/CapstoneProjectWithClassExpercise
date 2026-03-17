const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Question title is required'],
      trim: true,
      minlength: 10,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Question description is required'],
      trim: true,
    },
    topic: {
      type: String,
      trim: true,
    },
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 2, 
      ref: 'Status',
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

questionSchema.index({ title: 'text', description: 'text', topic: 'text' });

module.exports = mongoose.model('Question', questionSchema);
