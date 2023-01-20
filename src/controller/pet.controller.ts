import { Request, Response, NextFunction } from "express";
import { Pet } from "../Model/Pet";

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    console.log(pets);
    res.status(200).send(pets);
  } catch (error) {
    res.status(400).send(error);
  }
};
