import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import uuid from "uuid";
import mailService from "../service/mail.js";
import tokenService from "../service/token.js";
import UserDto from "../dto/user.js";

class UserService {
  async register(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error("User already exists");
    }
    const hashPassword = await bcryptjs.hash(password, 3);
    const activatedLink = uuid.v4();
    const user = await User.create({ email, password: hashPassword, activatedLink });
    await mailService.sendActivationMain(email, activatedLink);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new UserService();
