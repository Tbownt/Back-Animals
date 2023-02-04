import { Router } from "express";
import { formData } from "../controller/login.controller";

const loginRouter = Router();

loginRouter.post("/", formData);

export default loginRouter;
