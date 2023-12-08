import { body, validationResult, param } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import JobModels from "../models/JobModels.js";
import mongoose from "mongoose";
import UserModels from "../models/UserModels.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("unautherized request")) {
          throw new UnauthorizedError(
            "unautherized request from current User to this route"
          );
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

export const validateIdParams = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const job = await JobModels.findById(value);
    if (!job) throw new NotFoundError(`no job with id : ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = job.createdBy.toString() === req.user.userId;
    if (!isOwner || !isAdmin)
      throw new UnauthorizedError(
        "unautherized request from current User to this route"
      );
  }),
]);

export const validateRegistration = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const inSystem = await UserModels.findOne({ email });
      if (inSystem) throw new BadRequestError("Email Already Exists");
    }),
  body("password").notEmpty().withMessage("password is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdate = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const inSystem = await UserModels.findOne({ email });
      if (inSystem && inSystem.id.toString() !== req.user.userId)
        throw new BadRequestError("Email Already Exists");
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
