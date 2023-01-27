import { Router } from "express";
import {
	createVeterinary,
	getAllVeterinary,
	getVeterinaryId,
	updateVeterinary,
} from "../controller/veterinary.controller";

const veterinaryRouter = Router();

veterinaryRouter.get("/", getAllVeterinary);
veterinaryRouter.post("/", createVeterinary);
veterinaryRouter.get("/:id", getVeterinaryId);
veterinaryRouter.put("/:id", updateVeterinary);

export default veterinaryRouter;
