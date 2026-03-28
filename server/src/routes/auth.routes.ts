import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", ensureAuth, me);

export { authRoutes };