import { Router } from "express";
import { login, register, get_users } from "../controllers/authControllers.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validationMiddleWare.js";
const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/", get_users);

export default router;
