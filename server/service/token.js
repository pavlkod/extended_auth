import jwt from "jsonwebtoken";
class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  }
}
export default new TokenService();
