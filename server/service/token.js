import jwt from "jsonwebtoken";
import TokenModel from "../models/Token.js";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = TokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(token) {
    const refreshToken = await TokenModel.deleteOne({ refreshToken: token });
    return refreshToken;
  }
}
export default new TokenService();
