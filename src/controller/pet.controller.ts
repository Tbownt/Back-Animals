import { Request, Response, NextFunction } from "express";
import { Pet } from "../Model/Pet";

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.status(200).send(pets);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getPetId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findOneBy({ id });
    if (!pet) res.status(400).send({ msg: "Pet Id not found" });
    else res.status(200).send(pet);
  } catch (error) {
    res.status(404).send({ msg: "Error getting data" });
  }
};

export const createPet = async (req: Request, res: Response) => {
  const { size, species, age, img, detail, area, sex, status } = req.body;

  try {
    const newPet = new Pet();
    newPet.size = size;
    newPet.species = species;
    newPet.age = age;
    newPet.img = img;
    newPet.detail = detail;
    newPet.area = area;
    newPet.sex = sex;
    newPet.status = status;

    await newPet.save();
    // console.log(newPet)
    return res.status(200).send(newPet);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
  }
};

//modificado
