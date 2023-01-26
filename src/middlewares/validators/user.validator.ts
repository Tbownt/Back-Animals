import { check, validationResult, CustomValidator } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "../../Model/User";

// checkear después imagen
const isValidUser: CustomValidator = async (email) => {
	return User.find({ where: [{ email: email }] }).then((user) => {
		if (user.length) {
			return Promise.reject("E-mail already in use");
		}
	});
};

const isValidUserName: CustomValidator = async (username) => {
	return User.find({ where: [{ username: username }] }).then((user) => {
		console.log(user);
		if (user.length) {
			return Promise.reject("Username already in use");
		}
	});
};

export const userValidator = [
	check("name").exists().notEmpty().isLength({ min: 3, max: 20 }),

	check("surname").exists().notEmpty().isLength({ min: 3, max: 20 }),

	check("phone").exists().notEmpty().isNumeric().isLength({ min: 6, max: 15 }),

	check("email")
		.exists()
		.notEmpty()
		.isLength({ min: 6, max: 30 })
		.isEmail()
		.custom(isValidUser),

	check("username")
		.exists()
		.notEmpty()
		.isLength({ min: 5, max: 15 })
		.custom(isValidUserName),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		return next();
	},
];
