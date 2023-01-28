import { Request, Response } from "express";
import { User } from "../Model/User";
import { handleHttp, NotFoundError } from "../utils/error.handler";

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

		res.status(200)
				.send(newUser);
	} catch (error) {
		handleHttp(res, 'ERROR_CREATE_USER')
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		handleHttp(res, 'ERROR_GET_USERS')
	}
};

export const getUserId = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await User.find({
			where: [{ id: id }],
			relations: ["pet"],
		});

		if (!user) throw new NotFoundError(`User ${id} is not found`);
		else res.status(200).send(user);
	} catch (error) {
		handleHttp(res, 'ERROR_GET_USER')
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, surname, email, username, phone } = req.body;
	try {
		const user = await User.findOneBy({ id: id });
		if (!user) throw new NotFoundError(`User ${id} is not found`);
		await User.update({ id: id }, req.body);
		res.status(200).send("User Updated");
	} catch (error) {
		handleHttp(res, 'ERROR_UPDATE_USERS')
	}
};
