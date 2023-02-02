import { Router } from "express";
// importamos los routers
import petsRouter from "./pets.router";
import userRouter from "./user.router";
import productRouter from "./product.router";
import veterinaryRouter from "./veterinay.router";
import loginRouter from "./login";
import loginAuth0Router from "./loginAuth0";

//Usé el middleware Router() para crear manejadores de rutas montables y modularizados.
const router = Router();

//Paths
router.use("/pets", petsRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/veterinary", veterinaryRouter);
router.use("/login", loginRouter);
router.use("/loginAuth0", loginAuth0Router);

export default router;
