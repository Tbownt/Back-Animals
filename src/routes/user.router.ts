import { Router } from "express";
import {
  getAllUsers,
  getUserId,
  updateUser,
  createUser,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserId);
userRouter.put("/:id", updateUser);
userRouter.post("/", createUser);

export default userRouter;
