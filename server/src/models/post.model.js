import mongoose, { trusted } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    platforms: {
      type: [String],
      enum: ["facebook", "instagram", "linkedIn"],
      required: true,
      default: [],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Scheduled", "Draft"],
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    scheduleDate: {
      type: Date,
      default: Date.now,
    },
    isScheduled: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
