import { Router } from "express";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users", createUser);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);