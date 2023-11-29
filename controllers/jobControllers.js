import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res
      .status(400)
      .json({ message: "Please provide both company name and position" });
    return;
  }
  const id = nanoid();
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ message: "Job successfully Created", job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `Job not Found ${id}` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `Job not Found ${id}` });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ msg: "Job Modified", job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `Job not Found ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: "Job Deleted", job });
};
