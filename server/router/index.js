import { Router } from "express";
import UserController from "../controllers/user.js";

const router = new Router();

router.post("/register");
router.post("/login");
router.post("/logout");
router.get("/activate/:link");
router.get("/refresh");
router.get("/users", UserController.users);

export default router;
