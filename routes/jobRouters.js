import {
  validateJobInput,
  validateIdParams,
} from "../middleware/validationMiddleWare.js";
import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobControllers.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateIdParams, getSingleJob)
  .patch(validateJobInput, validateIdParams, updateJob)
  .delete(validateIdParams, deleteJob);

export default router;
