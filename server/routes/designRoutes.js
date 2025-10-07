// server/routes/designRoutes.js
import express from "express";
import {
  getDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
  getBuiltInDesigns, // ✅ import this
} from "../controllers/designController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User-specific designs (protected)
router.route("/").get(protect, getDesigns).post(protect, createDesign);
router.route("/:id").put(protect, updateDesign).delete(protect, deleteDesign);

// Built-in templates (public, no auth required)
router.get("/builtin", getBuiltInDesigns);

export default router;
