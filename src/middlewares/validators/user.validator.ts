import { check, validationResult } from "express-validator";
import { Request, Response } from "express";

// checkear después imagen

export const userValidator = [
	check("name").exists().notEmpty().isLength({ min: 3, max: 20 }),

	check("surname").exists().notEmpty().isLength({ min: 3, max: 20 }),

	check("phone").exists().notEmpty().isNumeric().isLength({ min: 6, max: 15 }),

	check("email").exists().notEmpty().isLength({ min: 6, max: 30 }).isEmail(),

	check("username").exists().notEmpty().isLength({ min: 5, max: 15 }).trim(),

	(req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.status(200).json({ msg: "Todo ok " });
	},
];
