import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controller/product.controller";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);

export default productRouter;
