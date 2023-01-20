import { Router } from "express";
import { getAllPets, getPetId, createPet } from "../controller/pet.controller";

const petsRouter = Router();

petsRouter.get("/", getAllPets);
petsRouter.get("/:id", getPetId);
petsRouter.post("/", createPet);

export default petsRouter;
