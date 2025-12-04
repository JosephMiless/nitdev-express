import { Router } from "express";
import { getUserProfileeControlleer, loginUserController, signUpuserController } from "./users.controllers.js";
import { auth } from '../middleware/auth.js';

export const userRouter = Router();

userRouter.post('/signup', signUpuserController);
userRouter.post('/login', loginUserController);
userRouter.get('/', auth, getUserProfileeControlleer);