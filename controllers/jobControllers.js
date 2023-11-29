import JobModels from "../models/JobModels.js";

export const getAllJobs = async (req, res) => {
  const jobs = await JobModels.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await JobModels.create(req.body);
  res.status(201).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModels.findById(id);

  if (!job) {
    return res.status(404).json({ msg: `Job not Found ${id}` });
  }

  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await JobModels.findByIdAndUpdate(id, req.body, { new: true });

  if (!job) {
    return res.status(404).json({ msg: `Job not Found ${id}` });
  }

  res.status(200).json({ modifiedJob: job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModels.findByIdAndDelete(id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job: job });
};
