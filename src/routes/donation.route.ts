import { Router } from "express";
import {paymentMp} from "../controller/paymentMp";
import { subscription } from "../controller/paymentMp";

const donationRouter = Router();

donationRouter.post('/', paymentMp );
donationRouter.post("/subscription",subscription );

export default donationRouter;