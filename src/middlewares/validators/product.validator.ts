import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// checkear después imagen

export const validatorPostProduct = [
	check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),

	check("description").exists().notEmpty().isLength({ min: 8, max: 200 }),

	check("price").exists().notEmpty().isNumeric(),

	check("stock").exists().notEmpty().isNumeric(),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		return next();
	},
];
