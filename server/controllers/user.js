import userService from "../service/user.js";
import { validationResult } from "express-validator";

import ApiError from "../exceptions/apiError.js";

class UserController {
  async users(req, res, next) {
    try {
      res.json({ message: "Get users" });
    } catch (e) {
      res.status(400).json({ message: "Could not get users" });
    }
  }
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Error transfer parameters", errors.array()));
      }
      const { email, password } = req.body;
      const user = await userService.register(email, password);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await userService.activate(link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookie;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (e) {
      next(e);
    }
  }
}
export default new UserController();
