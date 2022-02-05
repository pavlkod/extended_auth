import UserModel from "../models/User.js";
import bcryptjs from "bcryptjs";
import mailService from "../service/mail.js";
import { v4 } from "uuid";
import tokenService from "../service/token.js";
import UserDto from "../dto/user.js";

class UserService {
  async register(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error("User already exists");
    }
    const hashPassword = await bcryptjs.hash(password, 3);
    const activatedLink = v4();

    const user = await UserModel.create({ email, password: hashPassword, activatedLink });
    await mailService.sendActivationMail(email, activatedLink);

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
