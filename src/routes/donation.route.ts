import { Router } from "express";
import {paymentMp} from "../controller/paymentMp";

const donationRouter = Router();

donationRouter.post('/', paymentMp );



// donationRouter.get("/success", (req,res)=>{
//     res.send("PAGO  EXITOSO")
// })



export default donationRouter;