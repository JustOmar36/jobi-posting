import { StatusCodes } from "http-status-codes";

const errHandlerMiddleWare = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Server Error...Something Went Wrong";

  res.status(statusCode).json({ msg: msg });
};

export default errHandlerMiddleWare;
