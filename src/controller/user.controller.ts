import { Request, Response } from "express";
import { User } from "../Model/User";

export const createUser = async (req: Request, res: Response) => {
	const { name, surname, email, username, phone, role } = req.body;
	try {
		const newUser = new User();
		newUser.name = name;
		newUser.surname = surname;
		newUser.email = email;
		newUser.username = username;
		newUser.phone = phone;
		newUser.role = role;

		await newUser.save();
		// console.log(newUser);

		res.status(200).send(newUser);
	} catch (error) {
		if (error instanceof Error)
			return res.status(400).json({ message: error.message });
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const getUserId = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await User.find({
			where: [{ id: id }],
			relations: ["pet"],
		});

		if (!user) res.status(400).send({ msg: `User ${id} is not found` });
		else res.status(200).send(user);
	} catch (error) {
		res.status(404).send({ msg: "Error getting data" });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, surname, email, username, phone } = req.body;
	try {
		const user = await User.findOneBy({ id: id });
		if (!user) return res.status(404).json({ msg: `User ${id} is not found` });
		await User.update({ id: id }, req.body);
		res.status(200).send("User Updated");
	} catch (error) {
		res.status(404).send({ msg: "Error getting data" });
	}
};
