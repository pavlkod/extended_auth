class UserController {
  async users(req, res, next) {
    try {
      res.json({ message: "Get users" });
    } catch (e) {
      res.status(400).json({ message: "Could not get users" });
    }
  }
}
export default new UserController();
