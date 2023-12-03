import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJTW } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
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
