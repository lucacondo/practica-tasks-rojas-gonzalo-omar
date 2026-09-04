import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

export const taskRouter = Router();

taskRouter.get("/users", getAllUsers);
taskRouter.get("/users/:id", getUserById);
taskRouter.post("/users", createUser);
taskRouter.put("/users/:id", updateUser);
taskRouter.delete("/users/:id", deleteUser);