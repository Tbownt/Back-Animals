import { Router } from "express";
import { getAllPets, getPetId, createPet, updatePet, deletePet } from "../controller/pet.controller";

const petsRouter = Router();

petsRouter.get("/", getAllPets);
petsRouter.get("/:id", getPetId);
petsRouter.post("/", createPet);
petsRouter.put('/:id', updatePet);
petsRouter.delete('/:id', deletePet)

export default petsRouter;
