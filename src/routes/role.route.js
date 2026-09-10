import { Router } from "express";
import { createRole, assignRoleToUser } from "../controllers/role.controller.js";

export const roleRouter = Router();

roleRouter.post("/roles", createRole);
roleRouter.post("/roles/assign", assignRoleToUser);