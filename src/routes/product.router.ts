import { Router } from "express";
import {
	createProduct,
	getAllProducts,
	getProductId,
	updateProduct,
} from "../controller/product.controller";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);
productRouter.get("/:id", getProductId);
productRouter.put("/:id", updateProduct);

export default productRouter;
