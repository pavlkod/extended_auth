import UserModel from "../models/User.js";
import bcryptjs from "bcryptjs";
import mailService from "../service/mail.js";
import { v4 } from "uuid";
import tokenService from "../service/token.js";
import UserDto from "../dto/user.js";

import ApiError from "../exceptions/apiError.js";

class UserService {
  async register(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("User already exists");
    }
    const hashPassword = await bcryptjs.hash(password, 3);
    const activatedLink = v4();

    const user = await UserModel.create({ email, password: hashPassword, activatedLink });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}:${process.env.PORT}/api/activate/${activatedLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activatedLink) {
    const user = await UserModel.findOne({ activatedLink });
    if (!user) {
      throw ApiError.BadRequest("Wrong code");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User not found");
    }
    const isCorrectPwd = await bcryptjs.compareSync(password, user.password);
    if (!isCorrectPwd) {
      throw ApiError.BadRequest("Not correct password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      return ApiError.UnauthorizedError();
    }
    const validToken = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!validToken || !tokenFromDb) {
      return ApiError.UnauthorizedError();
    }

    const user = UserModel.findById(validToken.user);
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
