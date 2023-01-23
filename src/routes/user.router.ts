import { Router } from "express";
import {
  getAllUsers,
  getUserId,
  updateUser,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserId);
userRouter.put("/:id", updateUser);

export default userRouter;
