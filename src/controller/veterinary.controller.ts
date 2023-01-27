import { Request, Response } from "express";
import { Veterinary } from "../Model/Veterinary";

export const createVeterinary = async (req: Request, res: Response) => {
	const { name, description, email, image, phone, address } = req.body;
	try {
		const newVeterinary = new Veterinary();
		newVeterinary.name = name;
		newVeterinary.description = description;
		newVeterinary.email = email;
		newVeterinary.image = image;
		newVeterinary.phone = phone;
		newVeterinary.address = address;

		await newVeterinary.save();

		res.status(200).send(newVeterinary);
	} catch (error) {
		if (error instanceof Error)
			return res.status(400).json({ message: error.message });
	}
};

export const getAllVeterinary = async (req: Request, res: Response) => {
	try {
		const veterinary = await Veterinary.find();
		res.status(200).send(veterinary);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const getVeterinaryId = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const veterinary = await Veterinary.find({
			where: [{ id: id }],
		});

		if (!veterinary)
			res.status(400).send({ msg: `veterinary ${id} is not found` });
		else res.status(200).send(veterinary);
	} catch (error) {
		res.status(404).send({ msg: "Error getting data" });
	}
};

export const updateVeterinary = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const veterinary = await Veterinary.findOneBy({ id: id });
		if (!veterinary)
			return res.status(404).json({ message: "veterinary not found" });

		await Veterinary.update({ id: id }, req.body);
		return res.sendStatus(204);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
};
