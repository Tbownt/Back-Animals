import { Router } from "express";
import validatorPostPet from "../middlewares/validators/pet.validator";
import {
  getAllPets,
  getPetId,
  createPet,
  updatePet,
  deletePet,
} from "../controller/pet.controller";
import checkJwt from "../utils/jwtAuth0";

const petsRouter = Router();

petsRouter.get("/", getAllPets);
petsRouter.get("/:id", getPetId);
petsRouter.post("/", checkJwt, validatorPostPet, createPet);
petsRouter.put("/:id", checkJwt, updatePet);
petsRouter.delete("/:id", checkJwt, deletePet);

export default petsRouter;
