import { Request, Response } from "express";
import { Product } from "../Model/Product";
import { NotFoundError, handleHttp } from '../utils/error.handler'

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find();
		res.status(200).send(products);
	} catch (error) {
		handleHttp(res, 'ERROR_GET_PRODUCTS')
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
			handleHttp(res, 'ERROR_CREATE_PRODUCT')
		}
};
export const getProductId = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const product = await Product.find({
			where: [{ id: id }],
		});

		if (!product) throw new NotFoundError(`Product not found by that ID: ${id}`);
		else res.status(200).send(product);
	} catch (error) {
		handleHttp(res, 'ERROR_GETTING_PRODUCT')
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const product = await Product.findOneBy({ id: id });
		if (!product) throw new NotFoundError(`Product not found by that ID: ${id}`);
		await Product.update({ id: id }, req.body);
		return res.sendStatus(204);
	} catch (error) {
		if (error instanceof Error) {
			handleHttp(res, 'ERROR_UPDATE_PRODUCT')
		}
	}
};
