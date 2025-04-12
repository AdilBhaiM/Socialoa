import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/signup", signup);
router.post("/auth/verify-email", verifyEmail);
router.post("/auth/logout", logout);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password/:token", resetPassword);
router.get("/auth/check", protectedRoute, checkAuth);

export default router;
