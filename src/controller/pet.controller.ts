import { Request, Response } from "express";
import { Pet } from "../Model/Pet";
import { User } from "../Model/User";
import { NotFoundError, handleHttp } from "../utils/error.handler";

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.status(200).send(pets);
  } catch (error) {
    handleHttp(res, "ERROR_GET_ALL_PETS");
  }
};

export const getPetId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findOneBy({ id });
    if (!pet) throw new NotFoundError(`No pet found with ID: ${id}`);
    else res.status(200).send(pet);
  } catch (error) {
    handleHttp(res, "ERROR_GET_PET");
  }
};

export const createPet = async (req: Request, res: Response) => {
  const { size, species, age, img, detail, area, sex, status, userId } =
    req.body;

  try {
    const searchUser = await User.find({
      where: [{ id: userId }],
    });

    const newPet = new Pet();
    newPet.size = size;
    newPet.species = species;
    newPet.age = age;
    newPet.img = img;
    newPet.detail = detail;
    newPet.area = area;
    newPet.sex = sex;
    newPet.status = status;
    newPet.user = searchUser[0];

    await newPet.save();
    return res.status(200).send(newPet);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, "ERROR_CREATE_PET");
  }
};

export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findOneBy({ id: id });
    if (!pet) throw new NotFoundError(`No pet found with ID: ${id}`);

    await Pet.update({ id: id }, req.body);
    return res.sendStatus(204);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_PET");
  }
};

export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Pet.delete({ id: id });

    if (result.affected === 0)
      return res.status(404).json({ message: "Pet not found" });

    return res.sendStatus(204).json({ message: "Pet deleted" });
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, "ERROR_DELETE_PET");
    }
  }
};
