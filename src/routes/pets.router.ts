import { Router } from "express";
import validatorPostPet from "../middlewares/validators/pet.validator";
import {
	getAllPets,
	getPetId,
	createPet,
	updatePet,
	deletePet,
} from "../controller/pet.controller";
// import checkJwt from "../utils/jwtAuth0";

const petsRouter = Router();

petsRouter.get("/", getAllPets);
petsRouter.get("/:id", getPetId);
petsRouter.post("/", createPet);
petsRouter.put("/:id", updatePet);
petsRouter.delete("/:id", deletePet);

export default petsRouter;
