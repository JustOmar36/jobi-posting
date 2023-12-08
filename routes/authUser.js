import { Router } from "express";
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userControllers.js";
import { validateUpdate } from "../middleware/validationMiddleWare.js";
import { authenticateRole } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/get-stats", authenticateRole("admin"), getApplicationStats);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdate,
  updateUser
);

export default router;
