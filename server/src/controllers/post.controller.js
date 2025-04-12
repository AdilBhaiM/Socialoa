import { uploadPost } from "../AyrShare/createPost.js";

import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";

const validPlatforms = ["facebook", "instagram", ",linkedIn"];
const validStatus = ["Scheduled", "Draft"];

// Create Post
export const createPost = async (req, res) => {
  const {
    platforms,
    images,
    caption,
    status,
    scheduleDate,
    user,
    isScheduled,
  } = req.body;
  if (!platforms || !images[0] || !caption || !user)
    return res.status(400).json({
      message: "Provide all required fields to proceed further!",
    });
  if (!platforms.every((platform) => validPlatforms.includes(platform)))
    return res.status(401).json({
      message: "Platforma aren't valid",
    });
  if (!validStatus.includes(status))
    return res.status(401).json({
      message: "Status isn't valid",
    });
  try {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const resImage = await cloudinary.uploader.upload(image);
        return resImage.secure_url;
      })
    );
    let localDate;
    if (isScheduled) {
      localDate = new Date(scheduleDate);
    }
    const NewPost = new Post({
      platforms,
      images: uploadedImages,
      caption,
      status,
      localDate,
      user,
      isScheduled,
    });

    if (status === validStatus[0]) {
      uploadPost({
        post: caption,
        platforms: ["facebook"],
        mediaUrls: uploadedImages,
      });
    }

    await NewPost.save();
    return res.status(200).json({
      post: NewPost,
    });
  } catch (error) {
    console.log("Error in Creating Post : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Edit Post
export const EditPost = async (req, res) => {
  const { platforms, images, caption, status, scheduleDate } = req.body;
  const { id: postId } = req.params;
  console.log("Post ID:", postId);
  console.log("Request Body:", req.body);
  if (!postId)
    return res.status(400).json({
      message: "Post ID not provided",
    });
  if (!platforms || !images[0] || !caption)
    return res.status(400).json({
      message: "Provide all required fields to proceed further!",
    });
  if (!platforms.every((platform) => validPlatforms.includes(platform)))
    return res.status(401).json({
      message: "Platform isn't valid",
    });
  if (!validStatus.includes(status))
    return res.status(401).json({
      message: "Status isn't valid",
    });
  try {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const resImage = await cloudinary.uploader.upload(image);
        return resImage.secure_url;
      })
    );
    const TargetPost = await Post.findByIdAndUpdate(
      postId,
      {
        images: uploadedImages,
        caption: caption,
        status: status,
        platforms: platforms,
        scheduleDate: scheduleDate,
      },
      { new: true }
    );
    await TargetPost.save();
    res
      .status(200)
      .json({ message: "Post updated successfully", post: TargetPost });
  } catch (error) {
    console.log("Error in editing Post : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  if (!postId)
    return res.status(400).json({
      message: "Id is required",
    });
  try {
    const delPost = await Post.deleteOne({ _id: postId });
    if (delPost.deletedCount === 0)
      return res.status(404).josn({
        message: "Post not found",
      });
    res.status(200).json({
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    console.log("Error in deleting Post : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get All posts of Current user
export const getUserPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({
      user: req.user._id,
    });
    if (!allPosts) {
      return res.status(404).json({
        message: "No post",
      });
    }
    res.status(200).json({
      posts: allPosts,
    });
  } catch (error) {
    console.log("Error in fetching Posts : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// export const uploadpost = async (req, res) => {
//   uploadPost({
//     post: caption,
//     platforms: ["facebook"],
//     scheduleDate: zuluTime,
//     mediaUrls: uploadedImages,
//   });
// };
