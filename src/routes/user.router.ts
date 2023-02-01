import { Router } from "express";
import {
	getAllUsers,
	getUserId,
	updateUser,
	createUser,
	setStatusUserInDB,
	loginCtrl,
	deleteUser
} from "../controller/user.controller";
import { userValidator } from "../middlewares/validators/user.validator";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserId);
userRouter.put("/:id", updateUser);
userRouter.put("/setStatusUser/:id", setStatusUserInDB);
userRouter.post("/", userValidator, createUser);
userRouter.delete('/:id', deleteUser)
// http://localhost:3001/users/login 
userRouter.post('/', userValidator, loginCtrl);


export default userRouter;
