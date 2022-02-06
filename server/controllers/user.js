import userService from "../service/user.js";
class UserController {
  async users(req, res, next) {
    try {
      res.json({ message: "Get users" });
    } catch (e) {
      res.status(400).json({ message: "Could not get users" });
    }
  }
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.register(email, password);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
export default new UserController();
