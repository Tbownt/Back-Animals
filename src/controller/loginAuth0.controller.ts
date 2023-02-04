import { Request, Response } from "express";
import { User } from "../Model/User";

export const emailCheck = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		let user = await User.find({
			where: [{ email: email }],
			relations: ["pet"],
		});
		if (!user.length) {
			return res.status(400).json("Email no econtrado");
		} else {
			res.status(200).send(user);
		}

		console.log(user);
	} catch (error) {
		if (error) return res.status(400).json("Email no econtrado");
	}
};
