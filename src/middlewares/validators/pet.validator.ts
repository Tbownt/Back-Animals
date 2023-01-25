import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// checkear después imagen

const validatorPostPet = [

    check("size")
    .exists()
    .notEmpty(),

    check("species")
    .exists()
    .notEmpty(),

    check("age")
    .exists()
    .notEmpty(),

    /* .check(""), */ //img

    check("detail")
    .exists()
    .notEmpty()
    .isLength({min: 10, max: 200}),

    check("area")
    .exists()
    .notEmpty()
    .isLength({min: 3, max: 50}),

    check("sex")
    .exists()
    .notEmpty(),
    
    check("status")
    .exists()
    .notEmpty(),
    
    
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next()
  }
];

export default validatorPostPet 