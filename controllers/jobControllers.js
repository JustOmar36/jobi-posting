import JobModels from "../models/JobModels.js";
import { NotFoundErr } from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const jobs = await JobModels.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await JobModels.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModels.findById(id);

  if (!job) throw new NotFoundErr(`Job not Found ${id}`);

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await JobModels.findByIdAndUpdate(id, req.body, { new: true });

  if (!job) throw new NotFoundErr(`Job not Found ${id}`);

  res.status(StatusCodes.OK).json({ modifiedJob: job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModels.findByIdAndDelete(id);

  if (!job) throw new NotFoundErr(`Job not Found ${id}`);
  res.status(StatusCodes.OK).json({ job: job });
};
