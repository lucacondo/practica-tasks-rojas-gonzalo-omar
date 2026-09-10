import { Router } from "express";
import { createPerson, getAllPeople } from "../controllers/person.controller.js";

export const personRouter = Router();

personRouter.post("/people", createPerson);
personRouter.get("/people", getAllPeople);