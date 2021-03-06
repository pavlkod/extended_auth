import { Router } from "express";
import UserController from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";

import { body } from "express-validator";

const router = new Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.register
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);

export default router;
