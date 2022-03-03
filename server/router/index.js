import { Router } from "express";
import UserController from "../controllers/user.js";

import { body } from "express-validator";

const router = new Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.register
);
router.post("/login", UserController.login);
router.post("/logout");
router.get("/activate/:link", UserController.activate);
router.get("/refresh");
router.get("/users", UserController.users);

export default router;
