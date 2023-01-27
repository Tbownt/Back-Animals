import { check, validationResult, CustomValidator } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { Veterinary } from "../../Model/Veterinary";

// checkear después imagen
const isValidUser: CustomValidator = async (email) => {
	return Veterinary.find({ where: [{ email: email }] }).then((veterinary) => {
		if (veterinary.length) {
			return Promise.reject("E-mail already in use");
		}
	});
};

const isValidVeterinaryAddress: CustomValidator = async (address) => {
	return Veterinary.find({ where: [{ address: address }] }).then(
		(veterinary) => {
			console.log(veterinary);
			if (veterinary.length) {
				return Promise.reject("address already in use");
			}
		}
	);
};

const isValidVeterinaryphone: CustomValidator = async (phone) => {
	return Veterinary.find({ where: [{ phone: phone }] }).then((veterinary) => {
		console.log(veterinary);
		if (veterinary.length) {
			return Promise.reject("phone already in use");
		}
	});
};

export const veterinaryValidator = [
	check("name").exists().notEmpty().isLength({ min: 3, max: 20 }),

	check("phone")
		.exists()
		.notEmpty()
		.isNumeric()
		.isLength({ min: 6, max: 15 })
		.custom(isValidVeterinaryphone),

	check("email")
		.exists()
		.notEmpty()
		.isLength({ min: 6, max: 30 })
		.isEmail()
		.custom(isValidUser),

	check("description").exists().notEmpty().isLength({ min: 10, max: 200 }),

	check("address")
		.exists()
		.notEmpty()
		.isLength({ min: 5, max: 15 })
		.custom(isValidVeterinaryAddress),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		return next();
	},
];
