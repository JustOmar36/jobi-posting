import { Router } from "express";
import { login, register, logout } from "../controllers/authControllers.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validationMiddleWare.js";
const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
