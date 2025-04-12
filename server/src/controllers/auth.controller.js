import bycrypt from "bcryptjs";
import User from "../models/user.model.js";
import crypto from "crypto";
import { generateToken } from "../lib/utils.js";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../mailTrap/emails.js";

// Signup controller ------------------------------

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Enter all fields",
    });
  }
  // Check if user already exists and password is correct
  try {
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save the user to the database
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send verification email

    // sendVerificationEmail(email, verificationToken);

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: "User created Successfully",
        user: {
          ...newUser._doc,
          password: undefined,
        },
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login controller ------------------------------

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Enter all fields",
    });
  }
  // Check if user exists and password is correct
  try {
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }
    const loggingUser = await User.findOne({ email });
    if (!loggingUser)
      return res.status(400).json({ message: "User does not exist" });

    const isPasswordCorrect = await bycrypt.compare(
      password,
      loggingUser.password
    );

    // Generate token, send response or send error message
    if (isPasswordCorrect) {
      generateToken(loggingUser._id, res);
      loggingUser.lastLogin = Date.now();
      await loggingUser.save();
      res.status(200).json({
        message: "Logged in Successfully",
        user: {
          ...loggingUser._doc,
          password: undefined,
        },
      });
    } else {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Verify email controller ------------------------------

export const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  if (!verificationCode)
    return res.status(400).json({ message: "No Token Provided" });
  try {
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: "Invalid Token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    res.status(200).json({
      message: "User Verified Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in Verify Email Controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Logout controller ------------------------------

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forgot password controller ------------------------------

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate reset token and send email
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetToken = resetToken;
    user.resetTokenExpiresAt = resetTokenExpiresAt;

    // Sending Password Reset Link
    sendPasswordResetEmail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    await user.save();
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.log("Error in forgot password controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset password controller ------------------------------

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({
        message: "Invalid Token",
      });

    // Update Password

    const hashedPassword = bycrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordExpiresAt = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
  } catch (error) {
    console.log("Error in reseting password : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Check if user is logged in ------------------------------

export const checkAuth = async (req, res) => {
  try {
    // const existedUser = req.user
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in CheckAuth : " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
