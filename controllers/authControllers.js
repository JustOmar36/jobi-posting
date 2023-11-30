import { UnauthenticatedError } from "../errors/customErrors.js";
import UserModels from "../models/UserModels.js";
import { passwordHash, comparePassword } from "../utils/passwordUtils.js";
import { StatusCodes } from "http-status-codes";

export const login = async (req, res) => {
  const user = await UserModels.findOne({ email: req.body.email });
  const isValid =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValid) throw new UnauthenticatedError("invalid credentials");

  res.status(StatusCodes.OK).json(user);
};

export const register = async (req, res) => {
  const isFirstUser = (await UserModels.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  req.body.password = await passwordHash(req.body.password);

  const user = await UserModels.create(req.body);
  res.status(StatusCodes.CREATED).json("User Created Successfully");
};

export const get_users = async (req, res) => {
  const users = await UserModels.find({});
  res.status(StatusCodes.OK).json(users);
};
