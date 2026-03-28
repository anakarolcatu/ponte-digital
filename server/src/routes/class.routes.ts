import { Router } from "express";
import {
  getAllClasses,
  getClassById,
  getTeacherClasses,
} from "../controllers/class.controller.js";

const classRoutes = Router();

classRoutes.get("/", getAllClasses);
classRoutes.get("/teacher/:teacherId", getTeacherClasses);
classRoutes.get("/:id", getClassById);

export { classRoutes };