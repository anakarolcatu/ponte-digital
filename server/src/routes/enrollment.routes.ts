import { Router } from "express";
import { ensureAuth } from "../middlewares/auth.middleware.js";
import {
  cancelEnrollment,
  enrollInClass,
  getEnrolledUsersByClass,
  getMyEnrollments,
} from "../controllers/enrollment.controller.js";

const enrollmentRoutes = Router();

enrollmentRoutes.post("/", ensureAuth, enrollInClass);
enrollmentRoutes.delete("/:classId", ensureAuth, cancelEnrollment);
enrollmentRoutes.get("/me", ensureAuth, getMyEnrollments);
enrollmentRoutes.get("/class/:classId/users", ensureAuth, getEnrolledUsersByClass);

export { enrollmentRoutes };