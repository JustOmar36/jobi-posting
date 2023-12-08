import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJTW } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication error");
  try {
    const { userId, role } = verifyJTW(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    if (!token) throw new UnauthenticatedError("authentication error");
  }
};

export const authenticateRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not an Admin");
    }
    next();
  };
};
