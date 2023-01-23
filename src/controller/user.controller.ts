import { Request, Response, NextFunction } from "express";
import { User } from "../Model/User";
import { DataSource } from "typeorm";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOneBy({ id });
    if (!user) res.status(400).send({ msg: `User ${id} is not found` });
    else res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: "Error getting data" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, surname, email, username, phone } = req.body;
  try {
    const user = await User.findOneBy({ id: id });
    if (!user) return res.status(404).json({ msg: `User ${id} is not found` });
    await User.update({ id: id }, req.body);
    res.status(200).send("User Updated");
  } catch (error) {
    res.status(404).send({ msg: "Error getting data" });
  }
};
