import { Request, Response } from "express";
import { User } from "../Model/User";
import { handleHttp, NotFoundError } from "../utils/error.handler";
import { encrypt } from "../utils/bcrypt.handler";
import { verified } from "../utils/bcrypt.handler";

export const createUser = async (req: Request, res: Response) => {
	const { name, surname, email, username, phone, role, password } = req.body;
	try {
		const passwordHashed = await encrypt(password);

		const newUser = new User();
		newUser.name = name;
		newUser.surname = surname;
		newUser.email = email;
		newUser.password = passwordHashed;
		newUser.username = username;
		newUser.phone = phone;
		newUser.role = role;
		newUser.status = "active"; //le seteo el status en active cuando se crea. Lu

		await newUser.save();
		// console.log(newUser);

		res.status(200).send(newUser);
	} catch (error) {
		handleHttp(res, "ERROR_CREATE_USER");
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		handleHttp(res, "ERROR_GET_USERS");
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
		handleHttp(res, "ERROR_GET_USER");
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
		handleHttp(res, "ERROR_UPDATE_USERS");
	}
};

export const setStatusUserInDB = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await User.findOneBy({ id: id });
		if (!user) throw new NotFoundError(`User ${id} is not found`);
		if (user.status === "active") {
			await User.update({ id: id }, { status: "banned" });
			res.status(200).send("User banned.");
		} else {
			await User.update({ id: id }, { status: "active" });
			res.status(200).send("User re-activaded.");
		}
	} catch (error) {
		console.log(error); //manejo este error de momento. Lu
	}
};

export const loginCtrl = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await User.find({
		// select: [password],
		where: [{ email: email }],
		relations: ["pet"],
	});

	const emailDb = user.map((e) => e.email);
	const passwordDb = user.map((p) => p.password);

	for (let i = 0; i < passwordDb.length; i++) {
		let resultPassword = await verified(password, passwordDb[i]);

		if (emailDb[0] && resultPassword) return res.send(user);
		else res.json("usuario incorrecto");
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const userDeleted = await User.delete({ id: id });
		console.log(userDeleted);

		if (userDeleted.affected === 0)
			throw new NotFoundError(`User ${id} is not found`);
		res.send(`User deleted`);
	} catch (error) {
		handleHttp(res, "ERROR_DELETED_USER");
	}
};
