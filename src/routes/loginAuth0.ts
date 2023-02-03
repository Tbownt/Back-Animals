import { Router } from "express";
import { emailCheck } from "../controller/loginAuth0.controller";

const loginAuth0Router = Router();

loginAuth0Router.post("/", emailCheck);

export default loginAuth0Router;
