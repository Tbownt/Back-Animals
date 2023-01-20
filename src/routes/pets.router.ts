import { Router } from "express";
import { getAllPets } from "../controller/pet.controller";

const petsRouter = Router();

petsRouter.get("/", getAllPets);

export default petsRouter;
