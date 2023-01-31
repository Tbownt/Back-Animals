import { Request, Response } from "express";
import { User } from "../Model/User";

export const formData = async (req: Request, res: Response) => {
	const { email, username } = req.body;
	try {
		const user = await User.find({
			where: [{ email: email }],
			relations: ["pet"],
		});

		if (user[0].username !== username)
			return res.status(400).send("contraseña incorrecta");
		else res.status(200).send(user);
	} catch (error) {
		if (error)
			return res
				.status(400)
				.json("El Email ingresado no se encunetra registrado");
	}
};
