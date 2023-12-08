import { UnauthenticatedError } from "../errors/customErrors.js";
import UserModels from "../models/UserModels.js";
import { passwordHash, comparePassword } from "../utils/passwordUtils.js";
import { StatusCodes } from "http-status-codes";
import { createJWT } from "../utils/tokenUtils.js";

export const login = async (req, res) => {
  const user = await UserModels.findOne({ email: req.body.email });
  const isValid =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValid) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });
  let oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NOTE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "User Logged In" });
};

export const register = async (req, res) => {
  const isFirstUser = (await UserModels.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  req.body.password = await passwordHash(req.body.password);

  const user = await UserModels.create(req.body);

  res.status(StatusCodes.CREATED).json("User Created Successfully");
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged Out" });
};
