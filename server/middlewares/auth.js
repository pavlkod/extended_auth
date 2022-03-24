import ApiError from "../exceptions/apiError.js";
import tokenService from "../service/token.js";
export default function (req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
