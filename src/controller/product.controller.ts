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
  const { name, description, image, price } = req.body;
  try {
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.image = image;
    newProduct.description = description;
    newProduct.price = price;

    await newProduct.save();
    return res.status(200).send(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
