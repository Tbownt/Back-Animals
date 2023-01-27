import { Request, Response } from "express";
import { Product } from "../Model/Product";

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find();
		res.status(200).send(products);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const createProduct = async (req: Request, res: Response) => {
	const { name, description, image, price, stock, Category } = req.body;
	try {
		const newProduct = new Product();
		newProduct.Category = Category;
		newProduct.name = name;
		newProduct.image = image;
		newProduct.description = description;
		newProduct.price = price;
		newProduct.stock = stock;

		await newProduct.save();
		return res.status(200).send(newProduct);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
	}
};
export const getProductId = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const product = await Product.find({
			where: [{ id: id }],
		});

		if (!product) res.status(400).send({ msg: `product ${id} is not found` });
		else res.status(200).send(product);
	} catch (error) {
		res.status(404).send({ msg: "Error getting data" });
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const product = await Product.findOneBy({ id: id });
		if (!product) return res.status(404).json({ message: "Product not found" });

		await Product.update({ id: id }, req.body);
		return res.sendStatus(204);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
};
