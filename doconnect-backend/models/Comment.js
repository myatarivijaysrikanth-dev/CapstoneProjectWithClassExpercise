const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: [true, "Comment cannot be empty"],
      trim: true,
      maxlength: 500,
    },
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
